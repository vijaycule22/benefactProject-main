import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ApiResponse } from './ApiResponse';

@Injectable()
export class HttpService {

    public headers: HttpHeaders;
    
    //public Path: string = "/SYFT_4.5.0.00";
    public Path: string = "http://10.9.178.116/Benefact_Root";
    public pythodPath ="http://10.9.178.152";
    public t1 = window.location.protocol + "//" + window.location.hostname;
    public t = this.t1;
    //public BaseUrl: string = this.t + this.Path;
    public BaseUrl: string = this.Path;
    public PythonBaseUrl = this.pythodPath;   
    public static previousTime: Date = new Date();
    public static redirect: string;
    resp: ApiResponse<string>;
    constructor(
        private _http: HttpClient
    ) {
        this._http = _http;
        this.headers = new HttpHeaders();        
        this.headers.append('Content-Type', 'application/json');
    }
    
    
    private request(bundle:any) {
       
        let devicetoken: any;
        //devicetoken = JSON.parse(localStorage.getItem('DeviceTokenEntry'));
        let myConsystem: string;
        let userID: string;

        

        if (typeof bundle.apiMethod == "undefined") {
            throw "HttpService.request requires an apiMethod parameter in its params object";
        }

        var dataStr = "";

        var firstIteration = true;
        let objtokens = {
            "deviceTokenEntry": devicetoken
        }
        //assemble params into data string format
        if (typeof bundle.params != "undefined") {
            var i =0;
            for (var key in bundle.params) {
                if (bundle.params.hasOwnProperty(key)) {
                    if (firstIteration)
                        firstIteration = false;
                    else
                        dataStr += "&";

                    //accepts an array and assigns all values to key
                    if (key != "pPassword" && key != "confXml" && key != "pwd" && key != "newPassword") {
                        if (Object.prototype.toString.call(bundle.params[key]) === '[object Array]') {
                            for (i = 0; i < bundle.params[key].length; i++) {
                                if (i > 0)
                                    dataStr += "&";
                                dataStr += key + "=" + encodeURI(bundle.params[key][i]).replace(/\&/g, "%26");
                            }
                        } else if (Object.prototype.toString.call(bundle.params[key]) === '[object Object]') {
                            dataStr += key + "=" + JSON.stringify(bundle.params[key]);
                        }
                        else {
                            dataStr += key + "=" + encodeURI(bundle.params[key]).replace(/\&/g, "%26");
                        }
                    } else {
                        if (i > 0)
                            dataStr += "&";
                        dataStr += key + "=" + bundle.params[key];
                    }
                }
            }

        }
        if (objtokens != null && objtokens.deviceTokenEntry != null)
        {
            for (let x = 0; x < objtokens.deviceTokenEntry.length; x++) {
                if (firstIteration)
                    firstIteration = false;
                else
                    dataStr += "&";

                dataStr += "deviceTokenEntry" + "=" + objtokens.deviceTokenEntry[x];
            }
        }
       
        localStorage.setItem('lastServerCallTime', new Date().toString());
        return bundle.apiMethod + "?" + dataStr;
    }

    public get(bundle:any) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        
        let oPath = this.BaseUrl + apiPath;
        return this._http.get(oPath);
    }

    public getSync(bundle:any) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
       
        let oPath = this.BaseUrl + apiPath;
        return this._http.get(oPath).toPromise();
    }
    public getSyncPython(bundle:any) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
       
        let oPath = this.PythonBaseUrl + apiPath;
        return this._http.get(oPath).toPromise(); 
    }
    public createPython(bundle:any) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        
        let oPath = this.PythonBaseUrl + apiPath;
        return this._http.post(oPath, bundle.formData, { headers: this.headers });
    }
    public create(bundle:any) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        
        let oPath = this.BaseUrl + apiPath;
        return this._http.post(oPath, bundle.formData, { headers: this.headers });
    }

    public update(bundle:any) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23").replace(/\%da/g, "%25da");
        
        let opath = this.BaseUrl + apiPath;
        return this._http.put(opath, bundle.formData, { headers: this.headers }).toPromise();

    }

    public delete(bundle:any) {

        var apiPath = bundle.apiMethod;
        if (bundle.params != undefined) {
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        }
        
        let opath = this.BaseUrl + apiPath;
        return this._http.post(opath, bundle.formData, { headers: this.headers });
    }

    public handleError(error:HttpErrorResponse) {
		console.log('handleError : '+error);
           
        
    }

}