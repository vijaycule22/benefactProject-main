import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Shared/HttpService';

@Injectable({
  providedIn: 'root'
})
export class ApplyLoanService {

  constructor(private httpService: HttpService, private http: HttpClient) { }

  async InvokeLoan(LoanObj){
    return await this.httpService.createPython({
       "apiMethod": "/BenefactPythonServer/applyLoan",
      formData : LoanObj   
    })
  }

  async RequestedToSurtyPerson(LoanObj:any){
    return this.httpService.create({
      "apiMethod": "/api/BenefactUser/ApproveNotification",
      formData: LoanObj
      //    params: {
      //     "LoanObj":LoanObj     
      //  }
    }).toPromise();
  }

  async getBenefactors(empId: string){
    return await this.httpService.getSyncPython({
      "apiMethod": "/BenefactPythonServer/fetchBenefactors",
      params: {
        "emp":empId
      }
    })
  }
}
