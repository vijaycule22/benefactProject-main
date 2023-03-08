import sqlalchemy as db
from sqlalchemy import text
from src.connect import get_connection
import pandas as pd

# Define the Engine (Connection Object)
engine = get_connection()

class BenefactHealth:
    def __init__(self, emp) -> None:
          self.emp = emp

    def fetchbenefactHealth(self):

    # write the SQL query inside the text() block
        sql = text("SELECT \
                    Max_number_of_loans, Max_number_of_sureties  ,\
                    ISNULL(NO_OF_ACTIVE_LOANS,0) NO_OF_ACTIVE_LOANS, \
                    ISNULL(NO_OF_ACTIVE_Sureties, 0) NO_OF_ACTIVE_Sureties \
                    FROM BENEFACT_MASTER LEFT JOIN (SELECT Employee_ID, COUNT(*) NO_OF_ACTIVE_LOANS  FROM LOANS WHERE Loan_Status = 'Y' AND Employee_ID = " + "'" + self.emp + "'" + "\
                    GROUP BY Employee_ID \
                    ) L1 ON 1 = 1 LEFT JOIN \
                    (SELECT Employee_ID, COUNT(*) NO_OF_ACTIVE_Sureties  FROM LOANS WHERE Loan_Status = 'Y' AND Surety_ID = " + "'" + self.emp + "'" + "\
                    GROUP BY Employee_ID) L2 ON L1.Employee_ID = L2.Employee_ID \
                    WHERE Status = 1 \
")

        #print(sql)

        results = engine.execute(sql)
        data = []
        for record in results:
            data.append(record)

        df = pd.DataFrame(data, columns=['Max_number_of_loans','Max_number_of_sureties', 'NO_OF_ACTIVE_LOANS', 'NO_OF_ACTIVE_Sureties'])
        return df

if __name__ == '__main__':
    try:
    
        # GET THE CONNECTION OBJECT (ENGINE) FOR THE DATABASE
        BH = BenefactHealth('GHX10046')
        print(BH.fetchbenefactHealth())

    except Exception as ex:
        print("Connection could not be made due to the following error: \n", ex)

