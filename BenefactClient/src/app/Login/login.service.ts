import { Injectable } from '@angular/core';
import { VM_USER_INFO } from '../Models/VM_USER_INFO';
import { HttpService } from '../Shared/HttpService';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpService) { 

  }
  async DoUserlogin(UserData:VM_USER_INFO){
    return await this.httpService.getSync({
      "apiMethod": "/api/BenefactUser/Dologin",
      //FormData : UserData,
        params: {
           "UserID":UserData.EMPLOYEE_ID,
           "PassHash":UserData.PASSHASH
        }
    })
  }
  async AddBenefactUser(userDetails:VM_USER_INFO){
    return await this.httpService.create({
      "apiMethod": "/api/BenefactUser/AddUser",
      formData : userDetails       
    })
  }
}
