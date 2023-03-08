import { Component, OnInit, VERSION } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../Components/message';
import { VM_USER_INFO } from '../Models/VM_USER_INFO';
import { ApiResponse } from '../Shared/ApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { StatusType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { UserDetailsService } from '../Shared/user-details.service';
import { LoginService } from './login.service';
import * as CryptoJS from 'crypto-js';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, HttpService]
})
export class LoginComponent implements OnInit {
  public model: any = {};
  private myForm: FormGroup;
  public msgs: Message[] = [];
  private message: string;
  private statusMessage: string;
  slideLeft: boolean = false;
  slideRight: boolean = false;
  private PassHash: any;
  userlist: VM_USER_INFO;
  lstUserInfo: VM_USER_INFO = new VM_USER_INFO();
  pageLoader: boolean = false;
  //ConfirmPassword Code
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  resetPasswordForm = this.userForm.group(
    {
      PASSHASH: this.newPassword,
      CONFIR_PASSHASH: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('PASSHASH', 'CONFIR_PASSHASH'),
    }
  );



  constructor(public fb: FormBuilder,
    public userForm: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private UserDetailsService: UserDetailsService,
    private AtparConstants: AtParConstants, private location: LocationStrategy
    ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    this.myForm = this.fb.group({
      userID: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userlist = new VM_USER_INFO();
  }


  async onSubmit(userId, password) {
    try {
      this.pageLoader = true;
      var userInput = new VM_USER_INFO();
      userInput.EMPLOYEE_ID = userId.toUpperCase();
      var key = CryptoJS.enc.Utf8.parse('8080808080808080');
      var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

      // Storing Password for Old application will remove later

      let PASSHASH = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key,
        { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
      userInput.PASSHASH = PASSHASH.toString();
      //  userInput.PASSHASH = password.toString();
      //this.router.navigate(['Home']);
      await this.loginService.DoUserlogin(userInput).then(res => {
        let userDetails = res as ApiResponse<VM_USER_INFO>;
        console.log("userDetails:" + userDetails);
        let statusType = userDetails.statType;
        switch (statusType) {
          case StatusType.Success:
            let lstLogindetails = userDetails.dataList;
            if (lstLogindetails && lstLogindetails.length > 0) {
              this.UserDetailsService.sendUserDetails(lstLogindetails[0]);
              localStorage.setItem("UserDetails", JSON.stringify(lstLogindetails[0]));
              this.pageLoader = false;
              this.router.navigate(['Home/portfolio']);
            }
            else {
              this.statusMessage = userDetails.statusMessage;
              this.msgs = [];
              this.pageLoader = false;
              this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
            }
            break;
          case StatusType.Error:
            this.statusMessage = "login failed";
            this.msgs = [];
            this.pageLoader = false;
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
            break;
          case StatusType.Warn:
            this.statusMessage = userDetails.statusMessage;
            this.msgs = [];
            this.pageLoader = false;
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
            break;
          default:
            break;

        }
        if (userDetails.statusMessage == "") {

        }
      })

    }
    catch (ex) {
      this.pageLoader = false;
      this.clientErrorMsg(ex, "onSubmit");
    }
  }


  async OnAddUserClick(userInfo: VM_USER_INFO, PassHash: string) {
    try {
      // if((userInfo == undefined)||(PassHash==undefined||PassHash=="")){
      //   this.msgs =[];
      //   userInfo = null;
      //   this.statusMessage ="Please Enter valid User Details";
      //   this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
      //   return;
      // }
      if ((userInfo != undefined) && (PassHash != undefined || PassHash != "") && (userInfo.CONFIR_PASSHASH != undefined || userInfo.CONFIR_PASSHASH != "") && (PassHash != userInfo.CONFIR_PASSHASH)) {
        this.msgs = [];
        userInfo.CONFIR_PASSHASH = null;
        userInfo.PASSHASH = null;
        this.statusMessage = "Password Miss match";
        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
        return;
      }
      this.lstUserInfo = new VM_USER_INFO();
      this.lstUserInfo.FIRST_NAME = userInfo.FIRST_NAME;
      this.lstUserInfo.LAST_NAME = userInfo.LAST_NAME;
      this.lstUserInfo.EMAIL = userInfo.EMAIL;
      this.lstUserInfo.USER_TYPE = 0;
      this.lstUserInfo.EMPLOYEE_ID = userInfo.EMPLOYEE_ID;
      var key = CryptoJS.enc.Utf8.parse('8080808080808080');
      var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
      this.PassHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(PassHash), key,
        { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
      // userInfo.DOJ = time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
      this.lstUserInfo.PASSHASH = this.PassHash.toString();
      this.lstUserInfo.DOJ = new Date();
      await (await this.loginService.AddBenefactUser(this.lstUserInfo)).toPromise().then(res => {
        let userDetails = res as ApiResponse<any>;
        let statusType = userDetails.statType;
        switch (statusType) {
          case StatusType.Success:
            this.statusMessage = userDetails.statusMessage;
            this.model = {};
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
            this.userlist = new VM_USER_INFO();
            this.lstUserInfo = null;
            this.userForm = null;
            this.onSignupPageLogin();
            break;
          case StatusType.Error:
            this.statusMessage = userDetails.statusMessage;
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
            break;
          case StatusType.Warn:
            this.statusMessage = "Invalid User Data";
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
            break;
          default:
            break;
        }
      })
    }
    catch (ex) {
      this.clientErrorMsg("OnAddUserClick", ex.toString())
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onLoginPageSignup() {
    this.slideLeft = true;
    this.slideRight = false;
  }

  onSignupPageLogin() {
    this.slideLeft = false;
    this.slideRight = true;
  }

  clientErrorMsg(ex, funName) {
    this.msgs = [];
    this.AtparConstants.catchClientError(this.msgs, "", ex.toString(), funName, this.constructor.name);
  }

}
