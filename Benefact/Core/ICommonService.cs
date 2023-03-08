using BenefactServer.Common;
using BenefactServer.Model;

namespace BenefactServer.Core
{
    public interface ICommonService
    {
        AtParWebApiResponse<VM_LOAN_CAPUTURE_DETAILS> SendEmailNotificationsForApprove(VM_LOAN_CAPUTURE_DETAILS LoanObj);
    }
}
