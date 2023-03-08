using BenefactServer.Model;

namespace BenefactServer.Data
{
    public interface IUserRepository
    {
        List<MT_USER_INFO> GetUser();
        List<MT_USER_INFO> ValidateLoginUser(string UserID, string PassHash);
       int InsertNewUserInfo(MT_USER_INFO UserDetails);
    }
}
