import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Message } from '../Components/message';


export class AtParConstants {
    public static DATETIMEFORMAT_AM = 'MM/dd/yyyy hh:mm:ss a'
    //#region : variable declarations

    public static readonly DATE_FMT = 'MM/dd/yyyy';
    public static readonly DATE_TIME_FMT = `${AtParConstants.DATE_FMT} hh:mm:ss`;
    public static readonly DATE_TIME_FMT_AMPM = `${AtParConstants.DATE_FMT} HH:mm:ss a`;
    public static readonly DATE_TIME_NOSEC_FMT_AMPM = `${AtParConstants.DATE_FMT} hh:mm a`;
    public static readonly TIME_FMT = `hh:mm:ss`;
    public static readonly TIME_FMT_AMPM = `hh:mm a`;
    public static readonly DATE_TIME_MT = 'MM/dd/yyyy HH:mm:ss';
    public static readonly DTE_TIME_HM = `MM/dd/yyyy hh:mm`;

    public static count: boolean = false;
    public static PRODUCT_NAME: string = 'AtPar';
    public static isclicked = true;
    public static ClientErrorMessage: string = 'Internal Client Error';
    public static GrowlTitle_Warn: string = 'Warning';
    public static GrowlTitle_Error: string = 'Error';
    public static GrowlTitle_Info: string = 'Info';
    public static GrowlTitle_Success: string = 'Success';
    public static isLookupScreen: boolean = false;
    public static isImageCount: boolean = false;
    public static isSetRcdHeaderGridHeight: boolean = false;
    public static ViewButton : string  ='ViewButton'
    public static BeginCaseButton : string  ='BeginCaseButton'
    public static ReasonCode : string  ='Wasted'
    public static CaseReopened :string = "CASE REOPENED"
    public static REMOVED :string = "REMOVED"
    public static chunkFailedMessage = /Loading chunk [\d]+ failed/;
    public static NotFunctionMessage = /t.json is not a function/;
    public static CompanySpecific99 = "99 [Company-specific]";
    

    //<Label excluding ID> <Value> <Created/Updated/Added/Deleted> <Successfully>
    public static Created_Msg: string = "1% 2% Created Successfully";//Ex:Org Group(1%) HUMC(2%) Created Successfully 
    public static Updated_Msg: string = "1% 2% Updated Successfully";//Ex: Org Group(1%) HUMC(2%) Updated Successfully
    public static Updated_Status_Msg: string = "1% 2% Status Updated Successfully";//Ex: Org Group(1%) HUMC(2%) Status Updated Successfully  
    public static Deleted_Msg: string = "1% 2% Deleted Successfully";//Ex: Org Group(1%) HUMC(2%) Deleted Successfully 
    public static AlreadyExist_Msg: string = "1% 2% Already Exists";//Ex:Org Group(1%) HUMC(2%) Created Successfully 
    public static Added_Msg: string = "1% 2% Added Successfully";//Ex:Org Group(1%) HUMC(2%) Added Successfully

    public static RecordsPerPageOption: string[] = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '250', '500', '1000'];

    public static RecordsPerPageOptionForIE: string[] = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '250', '500', '1000'];

    public static ExistImage: boolean = false;

    public static SQL_InjectionException: boolean = false;

    constructor(@Inject(DOCUMENT) private document) {

        let isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        if (isIEOrEdge) {
            AtParConstants.RecordsPerPageOptionForIE = ['10'];
            AtParConstants.RecordsPerPageOption = ['10'];
        }
    }

    public catchClientError(statusMsgs: Message[], moduleService: string, errorMsg, funName = "", compName = "") {
        
        console.log('catchClientError : '+errorMsg.toString());
        if (AtParConstants.SQL_InjectionException == true) {
            statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Parameter passed to the function is invalid' });
        }
        else {
            statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage + ":" + errorMsg.toString() });
        }
        AtParConstants.SQL_InjectionException = false;
        console.log(errorMsg.toString());
    }

    public scrollToTop() {
        var elmnt = this.document.getElementById('main-section');
        elmnt.scrollTop = 0;
    }

    public static Serial_Number = 'Serial #';
    public static Lot_Number = 'Lot #';
    public static MAX_DATE = '9999/12/31';

    public static User_DropDown = 'Select User';
    public static BusinessUnit_DropDown = 'Select BUnit';
    public static User_Warning = 'Please select the User';
    public static BusinessUnit_Warning = 'Please select the Business Unit / Company';
    public static OrgGroupID_DropDown = 'Select One';
    public static OrgGroupID_Warning = 'Please select Org Group';
    public static CartID_Warning = 'Please select Cart ID';
    public static CartID_DropDown = 'Select Cart';
    public static UserAdmin_OrgGroupID_DropDown = 'Select Org Group';
    public static CartID_Enter_Warning = 'Please Enter CartID/Par Location'
    public static Dept_DropDown = 'Select Department';
    public static Dept_Warning = 'Please select Department';
    public static POU_BusinessUnit_Warning = 'Please select BUnit';
    public static Location_DropDown = 'Select Location';
    public static Model_DropDown = 'Select Label Layout';
    public static OrggroupidDefaultvalue = 'Select Org Group';
}