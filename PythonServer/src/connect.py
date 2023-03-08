
# IMPORT THE SQALCHEMY LIBRARY's CREATE_ENGINE METHOD
from sqlalchemy import create_engine
from urllib.parse import quote_plus

# DEFINE THE DATABASE CREDENTIALS
user = 'BENEF_MASTER_USER_LOANS'
password = quote_plus("133tcru@NOS")
host = '10.9.176.202'
port = '50244'
database = 'BENEF_MASTER_LOANS'
driver = 'SQL Server Native Client 11.0'

# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT

# ‘mssql+pyodbc://user:password@host/dbname?driver=SQL Server’


def get_connection():
    engine = create_engine(
        "mssql+pyodbc://{0}:{1}@{2}:{3}/{4}?driver={5}".format(
            user, password, host, port, database, driver)
        )
    
    return engine.connect()

if __name__ == '__main__':

	try:
		
		# GET THE CONNECTION OBJECT (ENGINE) FOR THE DATABASE
		engine = get_connection()
		print(
			f"Connection to the {host} for user {user} created successfully.")
	except Exception as ex:
		print("Connection could not be made due to the following error: \n", ex)
