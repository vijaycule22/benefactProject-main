import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { VM_USER_INFO } from 'src/app/Models/VM_USER_INFO';
import { UserDetailsService } from '../../Shared/user-details.service';
import { sharedService } from "../Body/sharedData.service";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html'
})
export class LeftMenuComponent implements OnInit {

  dropDownOpen: boolean = false;
  subscription: Subscription;
  constructor(private router: Router,private sharedService: sharedService
    ) {
      
     }

  ngOnInit() {
    this.subscription = this.sharedService.mySubject.subscribe(value => {
      this.dropDownOpen = value;
    });
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSignout(){
  //  localStorage.removeItem("UserDetails");
    this.router.navigate(['Login']);
  }

}
