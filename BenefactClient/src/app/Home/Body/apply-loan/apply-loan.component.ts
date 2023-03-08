import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Message } from 'src/app/Components/message';
import { LOAN_SUMMARY } from 'src/app/Models/LOAN_SUMMARY';
import { VM_USER_INFO } from 'src/app/Models/VM_USER_INFO';
import { AtParConstants } from 'src/app/Shared/AtParConstants';
import { ApplyLoanService } from './apply-loan.service';
import { BEFACTORS_LIST } from 'src/app/Models/BEFACTORS_LIST';
import { LOAN_CAPUTURE_DETAILS } from 'src/app/Models/LOAN_CAPUTURE_DETAILS';
import { SelectItem } from 'primeng/components/common/selectitem';
import { StatusType } from 'src/app/Shared/AtParEnums';
import { sharedService } from "../sharedData.service";

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  providers: [ApplyLoanService]
})
export class ApplyLoanComponent implements OnInit {
  Amount: number = 0;
  Tenure: number = 0;
  RateInterest: number = 10;
  SurtyMember: string;
  public msgs: Message[] = [];
  lstLoanSummary: LOAN_SUMMARY[] = [];
  emifinalamt: number = 0;
  amountInWords: any | undefined;
  amountChips: any = [50, 100, 150];
  numWords = require('num-words');
  data: any;
  lstUserDetails: VM_USER_INFO;
  statusMessage: string;
  lstBenefactor: BEFACTORS_LIST[] = [];
  filterBenefactor: any;
  benefactorsSuggestionList: any[] = [];
  finalSuggestions: any;
  reasonLoan: string = "";
  tenureList: SelectItem[] = [];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private applyLoanService: ApplyLoanService,
    private atParConstants: AtParConstants,
    private sharedService: sharedService) {
  }


  ngOnInit() {
    this.sharedService.mySubject.next(true);
    let details = JSON.parse(localStorage.getItem("UserDetails"));
    this.lstUserDetails = details;

    this.route.params.subscribe(params => {
      if (params['Amount']) {
        this.Amount = params['Amount'];
        this.Tenure = params['tenure'];
        this.RateInterest = params['ROI'];
        this.SurtyMember = "Select Surty Member";
      }
    });

    this.tenureList = [
      { label: 'Select Tenure', value: null },
      { label: '3 months', value: '3' },
      { label: '6 months', value: '6' },
      { label: '9 months', value: '9' },
      { label: '12 months', value: '12' },
    ]

    this.getBenefactors(this.lstUserDetails.EMPLOYEE_ID);
  }


  async InvokeLoan(Amount: number, Tenure: number, RateInterest: number, SurtyMember: any, loanReason: string) {
    try {
      let details = JSON.parse(localStorage.getItem("UserDetails"));
      this.statusMessage ="";
      if((Amount == undefined || Amount ==0)||(Tenure == undefined || Tenure ==0)||(RateInterest == undefined || RateInterest ==0)||
      (SurtyMember == undefined || SurtyMember ==""||SurtyMember =="Select Surty Member")){
        this.msgs =[];      
        if(Amount == undefined || Amount ==0){
          this.statusMessage ="Enter Valid Amount";
        }
        else if (Tenure == undefined || Tenure == 0) {
          this.statusMessage = "Enter Valid Tenure";
        }
        else if (RateInterest == undefined || RateInterest == 0) {
          this.statusMessage = "Enter Valid Interest Rate";
        }
        else if(SurtyMember == undefined || SurtyMember ==""||SurtyMember =="Select Surty Member")
        {
          this.statusMessage ="Select/Enter Valid Surty Member"; 
        }                 
          this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
          return;
      }
        this.lstUserDetails = details;
        let LoanObj:LOAN_CAPUTURE_DETAILS = new LOAN_CAPUTURE_DETAILS();
        LoanObj.EMPLOYEE_ID = this.lstUserDetails.EMPLOYEE_ID;
        LoanObj.AMOUNT=Amount;
        LoanObj.TENURE=Tenure;
        LoanObj.RATEOFINTEREST = RateInterest;
        LoanObj.SURETYMEMBER = SurtyMember.value;
        LoanObj.TRACKING_STATUS = 0;
        LoanObj.TO_MAILID = "vkuncha@ghx.com";  //this.lstUserDetails.EMAIL
        LoanObj.FROM_MAILID = "vkuncha@ghx.com";
        LoanObj.CC_MAILID = "vkuncha@ghx.com";      
        LoanObj.SUBJECT_TEXT = "Loan Request";        
        LoanObj.APPROVE_STATUS = 0;
         
        await this.applyLoanService.RequestedToSurtyPerson(LoanObj).then(res=>{
          let status = res as any;
          switch(status.statType){
            case StatusType.Success: {
              this.statusMessage ="Surty Request send successfull to "+ SurtyMember.value;
              this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
              //this.router.navigate(['Home/portfolio']);
              break;
            }
            case StatusType.Warn:
              {            
                this.statusMessage ="Unable to Apply the Request";
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                break;
              }
              case StatusType.Error:
              {               
                this.statusMessage ="General Client Error";
                this.msgs.push({ severity: 'Error', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                break;
              }              
          }
              this.Amount =null;
              this.Tenure = null;
              this.RateInterest =null;
              this.SurtyMember = null;
              this.reasonLoan = null;
        });
    }
    catch (ex) {

    }
  }

  async getBenefactors(empId: string) {
    try {
      await this.applyLoanService.getBenefactors(empId).then(res => {
        let data = res as any;
        let parsedData = JSON.parse(data);
        let obj: BEFACTORS_LIST;
        parsedData.forEach(element => {
          obj = new BEFACTORS_LIST;
          obj.BENEFACTOR_NAME = element.BENEFACTOR;
          obj.EMPLOYEE_ID = element.EMPLOYEE_ID;
          this.lstBenefactor.push(obj);
        });
        this.transformBenefactorDropdownData(this.lstBenefactor);
      })
    }
    catch (ex) {
      this.clientErrorMsg(ex, 'getBenefactHealth')
    }
  }



  transformBenefactorDropdownData(benefactorsList: BEFACTORS_LIST[]) {
    benefactorsList.forEach(ele => {
      this.benefactorsSuggestionList.push(
        {
          label: ele.BENEFACTOR_NAME + " " + "(" + ele.EMPLOYEE_ID + ")",
          value: ele.EMPLOYEE_ID
        });
    });
  }


  filterBenefactors(event) {
    let query = event.query;
    this.finalSuggestions = this.filterCountry(query, this.benefactorsSuggestionList);
  }


  filterCountry(query, benefactors: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < benefactors.length; i++) {
      let benefactor = benefactors[i];
      if (benefactor.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(benefactor);
      }
    }
    return filtered;
  }

  onAmountChip(amount: number) {
    this.Amount = amount * 1000;
    this.amountInWords = this.numWords(this.Amount);
  }


  clientErrorMsg(ex, funName) {
    this.msgs = [];
    this.atParConstants.catchClientError(this.msgs, "", ex.toString(), funName, this.constructor.name);
  }


  ngOnDestroy() {
    this.Amount = null;
    this.Tenure = null;
    this.RateInterest = null;
    this.SurtyMember = null;
    this.msgs = null;
    this.statusMessage = null;
    this.sharedService.mySubject.next(false);
  }
}
