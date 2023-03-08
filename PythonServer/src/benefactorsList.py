import sqlalchemy as db
from sqlalchemy import text
from src.connect import get_connection
import pandas as pd

# Define the Engine (Connection Object)
engine = get_connection()

class benefactorsList:

    def __init__(self, emp) -> None:
          self.emp = emp

    def fetchBenefactors(self):

    # write the SQL query inside the text() block
        sql = text("SELECT \
                    FIRST_NAME + ' ' + LAST_NAME  AS BENEFACTOR , \
                         EMPLOYEE_ID \
                    FROM [BENEFACT_USER_DETAILS_TBL] \
                    ")

        #print(sql)

        results = engine.execute(sql)
        data = []
        for record in results:
            data.append(record)

        df = pd.DataFrame(data, columns=['BENEFACTOR', 'EMPLOYEE_ID'])
        return df

if __name__ == '__main__':
    try:
    
        # GET THE CONNECTION OBJECT (ENGINE) FOR THE DATABASE
        BNL = benefactorsList('GHX10046')
        print(BNL.fetchBenefactors())

    except Exception as ex:
        print("Connection could not be made due to the following error: \n", ex)