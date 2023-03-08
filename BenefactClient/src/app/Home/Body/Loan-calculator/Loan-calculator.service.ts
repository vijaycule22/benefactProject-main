import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Shared/HttpService';

@Injectable({
  providedIn: 'root'
})
export class LoanCalculatorService {

  constructor(private httpService: HttpService) {

   }
   async LoanCalculation(Amount:number, Tenure, interest:number){
    return await this.httpService.getSyncPython({
      "apiMethod": "/BenefactPythonServer",
      //FormData : UserData,
        params: {
           "amount":Amount,
           "tenure":Tenure,
           "roi":interest
        }
    })
  }
}
