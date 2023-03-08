import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import { sharedService } from "../sharedData.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-loans-and-requests',
  templateUrl: './loans-and-requests.component.html',
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class LoansAndRequestsComponent implements OnInit {
  recentLoan: any = [];
  loanStatusStepperForm: FormGroup;

  constructor(private confirmationService: ConfirmationService,private sharedService: sharedService,private _formBuilder: FormBuilder, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {}

  ngOnInit() {
   this.recentLoan = [  
     { "name": "(Mar-2022) - (Mar-2023)", "age": "1,50,000", "gender": "ankit" },
     {  "name": "(Mar-2022) - (Mar-2023)", "age": "50,000", "gender": "raj"},
     {  "name": "(Mar-2022) - (Mar-2023)", "age": "1,00,000", "gender": "vishnu" },
     {  "name": "(Mar-2022) - (Mar-2023)", "age": "1,50,000", "gender": "man" }];
 
     this.loanStatusStepperForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
     this.addSvgIocnForStepper()
     this.sharedService.mySubject.next(true);
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to Accept?',
        accept: () => {
            //Actual logic to perform a confirmation
        }
    });
  }

  addSvgIocnForStepper(){
    this.matIconRegistry.addSvgIcon(
      'info',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg')
    );
  }

  ngOnDestroy() {
    this.sharedService.mySubject.next(false);
  }
}
