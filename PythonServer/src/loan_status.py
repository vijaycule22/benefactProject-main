import sqlalchemy as db
from sqlalchemy import text
from src.connect import get_connection
import pandas as pd

# Define the Engine (Connection Object)
engine = get_connection()

class loanStatus:
    def __init__(self, emp) -> None:
          self.emp = emp

    def fetchLoanStatus(self):

    # write the SQL query inside the text() block
        sql = text("SELECT \
                    DATEFROMPARTS(Year, Month, '01') Payment_date,\
                    EMI_Amount,\
                    EMI_Status\
                    FROM LOANS L JOIN \
                    LOAN_EMI LE ON \
                    L.Loan_ID = LE.Loan_ID\
                                WHERE Employee_ID = " + "'" + self.emp + "'" + "\
                    ")

        #print(sql)

        results = engine.execute(sql)
        data = []
        for record in results:
            data.append(record)

        df = pd.DataFrame(data, columns=['Payment_date', 'EMI_Amount', 'EMI_status'])
        return df
