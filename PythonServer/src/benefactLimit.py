import sqlalchemy as db
from sqlalchemy import text
from src.connect import get_connection
import pandas as pd

# Define the Engine (Connection Object)
engine = get_connection()

class BenefactLimit:
    def __init__(self, emp) -> None:
          self.emp = emp

    def fetchbenefactLimit(self):

    # write the SQL query inside the text() block
        sql = text("SELECT \
                    (Max_number_of_loans * Max_Loan_Amount) + (Max_number_of_sureties * Max_Loan_Amount) CREDIT_LIMIT,\
                    ISNULL(NO_OF_ACTIVE_LOANS,0) * Max_Loan_Amount  LOAN_SHARE, \
                    ISNULL(NO_OF_ACTIVE_Sureties, 0) * Max_Loan_Amount  SURETY_SHARE,\
                    (Max_number_of_loans * Max_Loan_Amount) + \
                    (Max_number_of_sureties * Max_Loan_Amount) - (ISNULL(NO_OF_ACTIVE_LOANS,0) * Max_Loan_Amount \
                    + ISNULL(NO_OF_ACTIVE_Sureties, 0) * Max_Loan_Amount) LIMIT_AVAILABLE \
                    FROM BENEFACT_MASTER LEFT JOIN (SELECT Employee_ID, COUNT(*) NO_OF_ACTIVE_LOANS  FROM LOANS WHERE Loan_Status = 'Y' AND Employee_ID = " + "'" + self.emp + "'" + "\
                    GROUP BY Employee_ID \
                    ) L1 ON 1 = 1 LEFT JOIN \
                    (SELECT Employee_ID, COUNT(*) NO_OF_ACTIVE_Sureties  FROM LOANS WHERE Loan_Status = 'Y' AND Surety_ID = " + "'" + self.emp + "'" + "\
                    GROUP BY Employee_ID) L2 ON L1.Employee_ID = L2.Employee_ID \
                    WHERE Status = 1 ")

        #print(sql)

        results = engine.execute(sql)
        data = []
        for record in results:
            data.append(record)

        df = pd.DataFrame(data, columns=['CREDIT_LIMIT', 'LOAN_SHARE', 'SURETY_SHARE', 'LIMIT_AVAILABLE'])
        return df

if __name__ == '__main__':
    try:
    
        # GET THE CONNECTION OBJECT (ENGINE) FOR THE DATABASE
        BL = BenefactLimit('GHX10046')
        print(BL.fetchbenefactLimit())

    except Exception as ex:
        print("Connection could not be made due to the following error: \n", ex)

