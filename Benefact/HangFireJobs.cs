using BenefactServer.Model;
using System.Net;
using System.Net.Mail;

namespace BenefactServer
{
    public static class HangFireJobs
    {
        public static void DisplayingHangFire(WebApplicationBuilder builder, WebApplication app)
        {
            try
            {
             
        //        app.UseHangfireDashboard("/hangfire", new DashboardOptions
        //        {
        //            DashboardTitle = "My Website",
        //            Authorization = new[]
        //{
        //        new HangfireCustomBasicAuthenticationFilter{
        //            User = builder.Configuration.GetSection("HangfireSettings:UserName").Value,
        //            Pass = builder.Configuration.GetSection("HangfireSettings:Password").Value
        //        }
        //    }
        //        });
        //        SERVICE_MANAGEMENT serviceObj = new SERVICE_MANAGEMENT();
        //        serviceObj.SERVICE_NAME = "Mail Service";
        //        serviceObj.SERVICE_STATE = true;
        //        serviceObj.FREQUENCY = "*/2 * * * *";
        //        AddOrUpdateHangfireServices(serviceObj);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public static bool AddOrUpdateHangfireServices(SERVICE_MANAGEMENT service)
        {
           // RecurringJob.AddOrUpdate(service.SERVICE_NAME, () => Console.WriteLine("recurring job!"), service.FREQUENCY);
            return true;
        }

        public static void Email()
        {
            try
            {
                //MailMessage message = new MailMessage();
                //SmtpClient smtp = new SmtpClient();
                //message.From = new MailAddress("vkuncha@ghx.com");
                //message.To.Add(new MailAddress("vkuncha@ghx.com"));
                //message.To.Add();
                //message.Subject = "Test";
                //message.IsBodyHtml = true; //to make message body as html  
                //message.Body = htmlString;
                //smtp.Port = 587;
                //smtp.Host = "Outlook.office365.com"; //for gmail host  
                //smtp.EnableSsl = true;
                //smtp.UseDefaultCredentials = false;
                //smtp.Credentials = new NetworkCredential("vkuncha@ghx.com", "Kvarahala@251");
                //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                //smtp.Send(message);
            }
           catch (Exception ex) {
                throw ex;
            }
        }

    }

}
