import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { VM_USER_INFO } from '../Models/VM_USER_INFO';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private userDetailsSource = new Subject<VM_USER_INFO>();
    UserDetailsObserver = this.userDetailsSource.asObservable();

  constructor() {

   }
  public sendUserDetails(Userdetails:VM_USER_INFO): void 
  { this.userDetailsSource.next(Userdetails); 
    console.log(this.userDetailsSource);
    console.log(Userdetails);
  }
}
