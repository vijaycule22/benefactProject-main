# Import libraries

import datetime
from dateutil import relativedelta
import pandas as pd


class loanCalculator:

    today = datetime.date.today()
    # .strftime("%b") + "-" + datetime.now().strftime("%Y")

    def __init__(self, amount, tenure, roi) -> None:
        self.amount = amount
        self.tenure = tenure
        self.roi = roi/1200

    def loan(self):
        df = pd.DataFrame()
        inst_dates, monthly_interest, principal, balance = [],[], [], []
        cumLoan = self.amount
        emi = self._emiCalculator()
        for t in range(1,self.tenure + 1):
            _inst_date = self.today + relativedelta.relativedelta(months=t, day=1)
            inst_dates.append(_inst_date.strftime("%b") + "-" + _inst_date.strftime("%Y"))
            _interest = self._interestCalculator(cumLoan)
            monthly_interest.append(_interest)
            principal.append(emi - _interest)
            #principal  = (emi - _interest)
            balance.append(cumLoan)
            cumLoan -= (emi - _interest)
        df['installment_date'] = inst_dates
        df['EMI']   = emi
        df['Interest'] = monthly_interest
        df['Cumulative_interest'] = df['Interest'].cumsum(axis=0)
        df['Cumulative_interest_to_be_paid'] = df.loc[::-1, 'Interest'].cumsum()[::-1] 
        df['Principal'] = principal 
        df['Balance'] = balance 
        return df
    
    def _interestCalculator(self, amount):
        return round((amount * self.roi),0)
        
    def _emiCalculator(self):
        return round(self.amount * self.roi * ((1+self.roi)**self.tenure)/((1+self.roi)**self.tenure - 1),0)

 
