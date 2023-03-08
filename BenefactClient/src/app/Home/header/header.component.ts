import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VM_USER_INFO } from 'src/app/Models/VM_USER_INFO';
import { UserDetailsService } from '../../Shared/user-details.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  lstUserDetails: any;
  subscription: any;
  constructor(private UserDetailsService: UserDetailsService) { }

  ngOnInit() {
    this.subscription = this.UserDetailsService.UserDetailsObserver.subscribe(userData=> {
      let custData = userData as VM_USER_INFO;
      this.lstUserDetails.push(custData);
    });
    let details = JSON.parse(localStorage.getItem("UserDetails"));
    this.lstUserDetails = details;
  }

  ngOnDestroy() {
    this.lstUserDetails =null;
    this.subscription.unsubscribe();
  }

}
