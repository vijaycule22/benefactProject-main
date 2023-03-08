using BenefactServer.Common;
using BenefactServer.Core;
using BenefactServer.Model;
using System.Globalization;
using System.Net.Mail;
using System.Web;
using static BenefactServer.Common.WebEnums;

namespace BenefactServer.Business
{
    public class CommonService : ICommonService
    {
        public AtParWebApiResponse<VM_LOAN_CAPUTURE_DETAILS> SendEmailNotificationsForApprove(VM_LOAN_CAPUTURE_DETAILS LoanObj)
        {
            string bodyContent = string.Empty;
            DateTime today = DateTime.Today;
            DateTime nextMonth = today.AddMonths(1);
            string nextMonthName = nextMonth.ToString("MMMM");
            int nextMonthYear = today.Month == 12 ? today.Year + 1 : today.Year;
            var response = new AtParWebApiResponse<VM_LOAN_CAPUTURE_DETAILS>();
            try
            {       if(LoanObj != null)
                {
                    if(LoanObj.TRACKING_STATUS == 0)
                    {  //, Sai/Anil/Kalyan/Varahalababu,
                     bodyContent = @"<html>
                    <body>
                    <p>Dear Admin Team,</p> 
                    <p>I would like to avail myself of the loan of Rs." + LoanObj.AMOUNT + "/-in the month of "+ nextMonthName + " "+ nextMonthYear + " with a tenure of "+ LoanObj.TENURE + " months. "+ LoanObj.SURETYMEMBER + " will give surety for this loan."+ LoanObj.SURETYMEMBER + " Could you please Confirm? Click Here to Login to App <a>http://localhost:4200/Login</a></p><p> Thanks and Regards,<br>" + LoanObj.EMPLOYEE_ID+"</br></p></body></html>";
                      LoanObj.SUBJECT_TEXT = "Surty Request";
                    }
                    else
                    {
                        bodyContent = @"<html>
                    <body>
                    <p>Dear Admin Team,</p> 
                    <p>I hereby accept surety for the loan request made by "+ LoanObj.EMPLOYEE_ID + ". </p><p> Thanks and Regards,<br>" + LoanObj.SURETYMEMBER + "</br></p></body></html>";
                        LoanObj.SUBJECT_TEXT = "Surty Request Approved";
                    }
                    
                    var status = SendMail(LoanObj, bodyContent);
                    if (status)
                    {
                        response.Data = LoanObj;
                        response.StatusCode = 0;
                        response.StatusMessage = "Success";
                        response.StatType = StatusType.Success;
                    }
                    else
                    {
                        response.Data = LoanObj;
                        response.StatusCode = 0;
                        response.StatusMessage = "falied";
                        response.StatType = StatusType.Error;
                    }
                }
                   
                return response;
                
            }
            catch (Exception ex)
			{
                response = new AtParWebApiResponse<VM_LOAN_CAPUTURE_DETAILS>();
                throw;
			}
        }

        private static bool SendMail(VM_LOAN_CAPUTURE_DETAILS loanObj, string bodyContent)
        {
            try
            {
                using (System.Net.Mail.MailMessage ApprovedMessage = new())
                {
                    MailAddress from = new(loanObj.FROM_MAILID);
                    ApprovedMessage.From = from;
                    ApprovedMessage.To.Add(loanObj.TO_MAILID);
                    ApprovedMessage.Subject = loanObj.SUBJECT_TEXT;
                    ApprovedMessage.Body = bodyContent;
                    ApprovedMessage.IsBodyHtml= true;
                    ApprovedMessage.CC.Add(loanObj.CC_MAILID); //"Benefact_App@ghx365.onmicrosoft.com"
                    System.Net.Mail.SmtpClient client = new("smtp.syftco.in")
                    {
                        Port =319,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        EnableSsl = false,
                        UseDefaultCredentials = false //False
                    };
                    client.Credentials = new System.Net.NetworkCredential("vkuncha@syftco.in", "Kvara@251");
                    client.Send(ApprovedMessage);
                    client.Dispose();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
                throw;
            }
            
        }
    }
}
