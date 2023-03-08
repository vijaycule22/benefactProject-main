using BenefactServer.Common;
using BenefactServer.Core;
using BenefactServer.Data;
using BenefactServer.Model;
using static BenefactServer.Common.WebEnums;
using System.Security.Cryptography;
using AtparEncryptionServices;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace BenefactServer.Business
{
    public class UserService : IUser
    {
        IUserRepository usersRepo;
        public UserService(IUserRepository currentuserrepo)
        {
            usersRepo = currentuserrepo;
        }
        public AtParWebApiResponse<MT_USER_INFO> GetAllUsers()
        {
            try
            {
                var response = new AtParWebApiResponse<MT_USER_INFO>();
                response.DataList = usersRepo.GetUser();
                if (response.DataList != null)
                {
                    response.StatType = StatusType.Success;
                    return response;
                }
                else
                {
                    response.StatusMessage = "unable to get user details";
                    response.StatType = StatusType.Error;
                    return response;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public AtParWebApiResponse<MT_USER_INFO> ValidateLogindetails(string UserID, string PassHash)
        {
            try
            {
                string Pwd = string.Empty;
                var response = new AtParWebApiResponse<MT_USER_INFO>();
                string decryptedPassword = string.Empty;
              //  AtparEncryptionServices.AtparEncryptionServices encrypt = new AtparEncryptionServices.AtparEncryptionServices();
                
              //  string stringToEncript = "\"#$%^&*(*)";
               // AtparEncryptionServices.AtparEncryptionServices encServices = new AtparEncryptionServices.AtparEncryptionServices();
               // var encriptedPasshash = encServices.EncryptString(PassHash, (short)AtparEncryptionServices.AtparEncryptionServices.PassphraseTypes.CXLDataPassphrase);
               // var decryptedPasshash = encServices.DecryptString(encriptedPasshash, (short)AtparEncryptionServices.AtparEncryptionServices.PassphraseTypes.CXLDataPassphrase);
                //Console.WriteLine(decryptedPasshash.Equals(PassHash));
                //Console.ReadLine();

                response.DataList = usersRepo.ValidateLoginUser(UserID, PassHash);
                if (response.DataList != null && response.DataList.Count>0)
                {
                    response.StatusMessage = "Success";
                    response.StatType = StatusType.Success;
                    return response;
                }
                else
                {
                    response.StatusMessage = "User Name and Password Mismatch";
                    response.StatType = StatusType.Warn;
                    return response;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public AtParWebApiResponse<MT_USER_INFO> AddNewUser(MT_USER_INFO userDetails)
        {
            var response = new AtParWebApiResponse<MT_USER_INFO>();
            try
            {                
                
                string passHashStr = string.Empty;
                string strPwd = userDetails.PASSHASH;
                //userDetails.PASSHASH = CSHA256.ComputeHash(strPwd, userDetails.EMPLOYEE_ID);
                //AtparEncryptionServices.AtparEncryptionServices encServices = new AtparEncryptionServices.AtparEncryptionServices();
                //var encriptedPasshash = encServices.EncryptString(strPwd, (short)AtparEncryptionServices.AtparEncryptionServices.PassphraseTypes.CXLDataPassphrase);
                //var decryptedPasshash = encServices.DecryptString(encriptedPasshash, (short)AtparEncryptionServices.AtparEncryptionServices.PassphraseTypes.CXLDataPassphrase);
               // userDetails.PASSHASH = encriptedPasshash;
                response.StatusCode = usersRepo.InsertNewUserInfo(userDetails); 
                if(response.StatusCode !=0)
                {                    
                    response.StatusMessage = "Insert Failed!";
                    response.StatType = StatusType.Error;
                }
                else
                {                 
                    response.StatusMessage = "User Data Saved Successfully!";
                    response.StatType = StatusType.Success;
                }
                return response;
            }
            catch (Exception ex)
            {
                response.StatusMessage = "General Server Error!";
                response.StatType = StatusType.Error;
                throw;
            }
        }

        public void sendMail()
        {
            try
            {
                StringBuilder emailMessage = new StringBuilder();
                emailMessage.Append("Dear Payment Team ,");
                emailMessage.Append("<br><br>Please find the Payment instruction");

                //MailSettings.SMTPServer = Convert.ToString(ConfigurationManager.AppSettings["HostName"]);
                MailMessage Msg = new MailMessage();
                // Sender e-mail address.
                Msg.From = new MailAddress("vkuncha@ghx.com");
                // Recipient e-mail address.
                Msg.To.Add("vkuncha@ghx.com");
                Msg.CC.Add("vkuncha@ghx.com");
                Msg.Subject = "Timesheet Payment Instruction updated";
                Msg.IsBodyHtml = true;
                Msg.Body = emailMessage.ToString();
                NetworkCredential loginInfo = new NetworkCredential("vkuncha@syftco.in", "Kvara@251"); // password for connection smtp if u dont have have then pass blank

                SmtpClient smtp = new SmtpClient();
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = loginInfo;
                smtp.EnableSsl = true;
                //No need for port
                smtp.Host = "smtp.syftco.in";
                smtp.Port = 319;
                smtp.Send(Msg);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
