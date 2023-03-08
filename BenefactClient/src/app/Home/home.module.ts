import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {AccordionModule} from 'primeng/accordion';
import { PortfolioComponent } from './Body/portfolio/portfolio.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LoanCalcultorComponent } from './Body/Loan-calculator/Loan-calculator.component';
import { ApplyLoanComponent } from './Body/apply-loan/apply-loan.component';
import { SkeletonModule } from '../Components/skelton/skelton';
import { GrowlModule } from '../Components/growl/growl.component';
import { AtParConstants } from '../Shared/AtParConstants';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LoansAndRequestsComponent } from './Body/loans-and-requests/loans-and-requests.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LeftMenuComponent,
    LoanCalcultorComponent,
    HomeComponent,
    PortfolioComponent,
    HeaderComponent,
    ApplyLoanComponent,
    LoansAndRequestsComponent
  ],
  imports: [ 
    CommonModule,
    HomeRoutingModule,
    TabViewModule,
    ButtonModule,
    FormsModule,
    TableModule,
    RouterModule,
    AccordionModule,
    DropdownModule,
    SkeletonModule,
    GrowlModule,
    AutoCompleteModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    MatIconModule
  ],
  providers: [AtParConstants,ConfirmationService]
})
export class HomeModule { }
