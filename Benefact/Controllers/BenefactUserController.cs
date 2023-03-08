using BenefactServer.Common;
using BenefactServer.Core;
using BenefactServer.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace BenefactServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BenefactUserController : ControllerBase
    {
        private readonly MT_Context _mtContext;
        private readonly IUser _user;
        private readonly ICommonService _commonService;
        public BenefactUserController(MT_Context mtContext, IUser user, ICommonService commonService)
        {
            _mtContext = mtContext;
            _user = user;
            _commonService = commonService;
        }

        //Get:api/GetAllUsers
        [HttpGet]
        [Route("[action]", Name = "GetAllUsers")]
        public AtParWebApiResponse<MT_USER_INFO> GetAllUsers()
        {
            if(_mtContext.UserDetails == null)
            {
                //return NotFound();
            }
            //return await _mtContext.UserDetails.ToListAsync();
            var result =  _user.GetAllUsers();
            _user.sendMail();
            return result;            
        }
        
        [HttpGet("{EmpolyeeID}")]        
        public async Task<ActionResult<MT_USER_INFO>> GetLoansByUser(string EmpolyeeID)
        {
            if(_mtContext.UserDetails == null)
            {
                return NotFound();
            }
            var details = await _mtContext.UserDetails.FindAsync(EmpolyeeID);
            if(details == null)
            {
                return NotFound();
            }
            return details;
            
        }
        
        [HttpPost]
        [Route("[action]", Name = "AddUser")]
        public AtParWebApiResponse<MT_USER_INFO> AddUser(MT_USER_INFO userDetails)
        {
            try
            {              
                var SaveduserDetails =  _user.AddNewUser(userDetails);
                return SaveduserDetails;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
           
        }

        [HttpPost]
        [Route("[action]", Name = "ApproveNotification")]
        public AtParWebApiResponse<VM_LOAN_CAPUTURE_DETAILS> ApproveNotification([FromBody] VM_LOAN_CAPUTURE_DETAILS LoanObj)
        {
            try
            {               
                var response = _commonService.SendEmailNotificationsForApprove(LoanObj);
                return response;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet]
        [Route("[action]", Name = "Dologin")]
        public AtParWebApiResponse<MT_USER_INFO> Dologin(string UserID, string PassHash)
        {
            try
            {
                var userDetails = _user.ValidateLogindetails(UserID,PassHash);
                return userDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        }
}
