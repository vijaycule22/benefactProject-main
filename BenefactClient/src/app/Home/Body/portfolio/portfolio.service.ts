import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Shared/HttpService';

@Injectable({
  providedIn: 'root'
})
export class PortFolioService {

  constructor(private httpService: HttpService) {

   }
   async getLoanStatus(empId: string){
    return await this.httpService.getSyncPython({
      "apiMethod": "/BenefactPythonServer/loanstatus",
      params: {
        "emp":empId
        
      }
    })
  }

  async getPortfolio(empId: string){
    return await this.httpService.getSyncPython({
      "apiMethod": "/BenefactPythonServer/portfolio",
      params: {
        "emp":empId
      }
    })
  }

  async getBenefactHealth(empId: string){
    return await this.httpService.getSyncPython({
      "apiMethod": "/BenefactPythonServer/benefactHealth",
      params: {
        "emp":empId
      }
    })
  }

  async getBenefactLimit(empId: string){
    return await this.httpService.getSyncPython({
      "apiMethod": "/BenefactPythonServer/benefactLimit",
      params: {
        "emp":empId
      }
    })
  }
}
