import sqlalchemy as db
from sqlalchemy import text
from src.connect import get_connection
import pandas as pd

# Define the Engine (Connection Object)
engine = get_connection()

class portfolio:
    def __init__(self, emp) -> None:
          self.emp = emp

    def fetchPortfolio(self):

    # write the SQL query inside the text() block
        sql = text("SELECT Employee_ID,\
                                SUM(Invest) AS Invest,\
                                SUM(Returns) AS Returns,\
                                SUM(Invest) + SUM(Returns) AS TOTAL_EARN,\
                                DATEFROMPARTS(Year, Month, '01') Investment_date\
                                FROM [PORTFOLIO]\
                                WHERE Employee_ID = " + "'" + self.emp + "'" + "\
                                GROUP BY Employee_ID,\
                                DATEFROMPARTS(Year, Month, '01')")

        #print(sql)

        results = engine.execute(sql)
        data = []
        for record in results:
            data.append(record)

        df = pd.DataFrame(data, columns=['Employee_ID', 'Invest', 'Returns', 'Total_earn', 'Investment_date'])
        df['Cumulative_earn'] = df['Total_earn'].cumsum(axis=0)
        df['Cumulative_invest'] = df['Invest'].cumsum(axis=0)
        df['Cumulative_returns'] = df['Returns'].cumsum(axis=0)
        return df


