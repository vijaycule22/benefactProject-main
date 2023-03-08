using BenefactServer.Common;
using BenefactServer.Data;
using BenefactServer.Model;
using System.Text;

namespace BenefactServer.DataRepository
{
    public class UserRepository : IUserRepository
    {
        public List<MT_USER_INFO> GetUser()
        {
            try
            {
                List<MT_USER_INFO> lstServices = new();
                StringBuilder sbSql = new StringBuilder();
                using (MT_Context objContext = new MT_Context())
                {
                    sbSql.Append("SELECT * FROM [BENEF_MASTER_SCHEMA_LOANS].[BENEFACT_USER_DETAILS_TBL]");
                    //sbSql.Append(" ");

                    // var users = objContext.SqlQuery<UserInfo>(sbSql.ToString());
                    lstServices = objContext.ExecuteQuery<MT_USER_INFO>(sbSql.ToString());
                   // lstServices.Add(users);
                    return lstServices;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
            }
        public List<MT_USER_INFO> ValidateLoginUser(string UserID, string PassHash)
        {
            try
            {
                List<MT_USER_INFO> validateDetails = new();
                StringBuilder sbSql = new();
                using(MT_Context objContext = new MT_Context())
                {
                    sbSql.Append("SELECT * FROM [BENEF_MASTER_SCHEMA_LOANS].[BENEFACT_USER_DETAILS_TBL] WHERE EMPLOYEE_ID ='" + UserID);
                    sbSql.Append("' AND PASSHASH ='" + PassHash + "'");
                    validateDetails = objContext.ExecuteQuery<MT_USER_INFO>(sbSql.ToString()); 
                }
                if (validateDetails.Count > 0)
                {
                    return validateDetails;
                }
                {
                    return validateDetails = new();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int InsertNewUserInfo(MT_USER_INFO userInfo)
        {
            try
            {
                List<MT_USER_INFO> validateDetails = new();
                StringBuilder sbSql = new();
                int StatusCode = -1;
                int res = 0;
                using (MT_Context objContext = new MT_Context())
                {
                    sbSql.Append($"INSERT INTO [BENEF_MASTER_SCHEMA_LOANS].[BENEFACT_USER_DETAILS_TBL](EMPLOYEE_ID,FIRST_NAME,LAST_NAME,DOJ,PASSHASH,USER_TYPE,EMAIL,MOBILE_NUMBER)");
                    sbSql.Append($"VALUES('" + userInfo.EMPLOYEE_ID + "','" + userInfo.FIRST_NAME + "','" + userInfo.LAST_NAME + "','" + DateTime.Now.ToString() + "','" + userInfo.PASSHASH);
                    sbSql.Append($"','" + userInfo.USER_TYPE + "','" + userInfo.EMAIL + "','" + userInfo.MOBILE_NUMBER + "');");
                    // var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    // validateDetails = objContext.ExecuteQuery<MT_USER_INFO>(sbSql.ToString());
                  objContext.UserDetails.Add(userInfo);
                    res = objContext.SaveChanges();
                }
                if (res != 0)
                {
                    return StatusCode = 0;
                }
                {
                    return StatusCode;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Insert Failed");
                throw;
            }
        }
    }
}
