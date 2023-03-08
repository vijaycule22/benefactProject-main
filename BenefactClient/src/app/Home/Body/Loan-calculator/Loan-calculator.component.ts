import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'src/app/common/api';
import { Message } from 'src/app/Components/message';
import { LOAN_SUMMARY } from 'src/app/Models/LOAN_SUMMARY';
import { AtParConstants } from 'src/app/Shared/AtParConstants';
import { LoanCalculatorService } from './Loan-calculator.service';
import { sharedService } from "../sharedData.service";

@Component({
  selector: 'Loan-calcultor',
  templateUrl: './Loan-calculator.component.html',
  providers:[LoanCalculatorService]
})
export class LoanCalcultorComponent implements OnInit {
  Amount:number =0;
  Tenure:number =0;
  RateInterest :number = 10;
  public msgs: Message[] = [];
  lstLoanSummary:LOAN_SUMMARY[]=[];
  emifinalamt:number =0;
  totalPaidAmount:number=0;
  OriginalLoanAmount =0;
  amountInWords: any | undefined;
  amountChips:any = [50,100,150];
  numWords = require('num-words');
  tenureList: SelectItem[] = [];  
  private statusMessage:string;

  constructor(private contentBody:LoanCalculatorService,
    private AtparConstants:AtParConstants,
    private router: Router,private sharedService: sharedService) { }

  ngOnInit() {
    this.OriginalLoanAmount = 0;
    this.totalPaidAmount = 0;     
    this.emifinalamt =0;
    this.sharedService.mySubject.next(true);
    this.tenureList = [
      {label:'Select Tenure', value:null},
      {label:'3 months', value: '3'},
      {label:'6 months', value: '6'},
      {label:'9 months', value:'9'},
      {label:'12 months', value:'12'},
    ]
  }
  totalInterest: any;
  totalAmountIncreasePercentage:any
  
  async LoanCalculation(Amount:number,tenure:number,ROI:number){
    try{
      this.msgs =[];
      if((Amount ==undefined|| Amount ==0)||(tenure==undefined||tenure==0))
      {        
        if((Amount ==undefined|| Amount ==0))
        {
          this.statusMessage ="Enter Required Loan Amount";
        }
        else{
          this.statusMessage ="Select Required Tenure";
        }
        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
        return;
      }
      this.OriginalLoanAmount = 0;
      this.lstLoanSummary =[]; 
      this.OriginalLoanAmount = Amount;
      this.contentBody.LoanCalculation(Amount,tenure,ROI).then(res=>{
        let result = res as any;
        let newArryList = JSON.parse(result);           
        this.totalPaidAmount = 0;     
        this.emifinalamt =0;     
        newArryList.forEach(element => {      
        var loanSummary = new LOAN_SUMMARY;
        let details = JSON.parse(localStorage.getItem("UserDetails"));
        loanSummary.CUSTOMER_NAME_INFO = details;           
        loanSummary.INSTALLMENT_DATE = element.installment_date     
        loanSummary.EMI = element.EMI;
        loanSummary.INTEREST = element.Interest;
        loanSummary.CUMULATIVE_INTEREST = element.Cumulative_interest;
        loanSummary.CUMULATIVE_INTEREST_TO_BE_PAID = element.Cumulative_interest_to_be_paid;
        loanSummary.PRINCIPAL = element.Principal;
        loanSummary.BALANCE = element.Balance;
        this.totalPaidAmount += element.Interest;
        this.lstLoanSummary.push(loanSummary);      
        }); 
        this.totalPaidAmount += this.lstLoanSummary[0].BALANCE;
        this.emifinalamt = this.lstLoanSummary[0].EMI; 
        this.totalInterest = this.lstLoanSummary[0].CUMULATIVE_INTEREST_TO_BE_PAID;
        this.totalAmountIncreasePercentage = (this.totalInterest / this.totalPaidAmount) * 100;           
      })
    }
    catch(ex)
    {
      this.clientErrorMsg(ex,"GetloanCaluction")
    }
  }
 
  ApplyLoanRequest(Amount:number,tenure:number,ROI:number){
    try{
      let loanReqObj:any = {};
      loanReqObj.Amount = Amount;
      loanReqObj.tenure = tenure;
      loanReqObj.ROI = ROI;
      this.router.navigate(['Home/applyLoan',loanReqObj]);
      //this.router.navigate(['Home/applyLoan'],{queryParams:{"LoanRequest":loanReqObj}});
    }
    catch(ex){
      this.clientErrorMsg(ex,"ApplyLoanRequest");
    }
  }
  onAmountInput(){
    this.amountInWords = this.numWords(this.Amount);
  }

  onAmountChip(amount: number){
    this.Amount = amount * 1000;
    this.amountInWords = this.numWords(this.Amount);
  }

  clientErrorMsg(ex, funName) {
    this.msgs = [];
    this.AtparConstants.catchClientError(this.msgs, "", ex.toString(), funName, this.constructor.name);
}
ngOnDestroy() {
    this.sharedService.mySubject.next(false);
}

}
