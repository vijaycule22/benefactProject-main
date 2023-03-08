
export class Constants {
    public static ClientErrorMessage: string = 'Internal Client Error';
    public static GrowlTitle_Warn: string = 'Warning';
    public static GrowlTitle_Error: string = 'Error';
    public static GrowlTitle_Info: string = 'Info';
    public static GrowlTitle_Success: string = 'Success';
    public catchClientError(errorMsg:any, funName = "", compName = "") {
        console.log('catchClientError : '+errorMsg.toString());
        console.log(errorMsg.toString());
    }
    }