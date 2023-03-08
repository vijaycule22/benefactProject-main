import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoanCalcultorComponent } from './Body/Loan-calculator/Loan-calculator.component';
import { PortfolioComponent } from './Body/portfolio/portfolio.component';
import { ApplyLoanComponent } from './Body/apply-loan/apply-loan.component';
import { LoansAndRequestsComponent } from './Body/loans-and-requests/loans-and-requests.component';

const Homeroutes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      {
        path: 'portfolio',
        component: PortfolioComponent
      },
      {
        path: 'loanCalculator',
        component: LoanCalcultorComponent
      },
      {
        path: 'applyLoan',
        component: ApplyLoanComponent
      },
      {
        path: 'applyLoan/:id',
        component: ApplyLoanComponent
      },
      {
        path: 'loanAndRequests',
        component: LoansAndRequestsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(Homeroutes)
  ]
})
export class HomeRoutingModule { }
