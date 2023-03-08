using BenefactServer.Common;
using BenefactServer.Model;

namespace BenefactServer.Core
{
    public interface IUser
    {
        AtParWebApiResponse<MT_USER_INFO> GetAllUsers();
        AtParWebApiResponse<MT_USER_INFO> ValidateLogindetails(string UserID, string PassHash);
        AtParWebApiResponse<MT_USER_INFO> AddNewUser(MT_USER_INFO userinfo);
        void sendMail();
    }
}
