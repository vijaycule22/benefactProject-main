from flask import Flask,request, jsonify
import json
from src.loanCalculator import loanCalculator
from src.portfolio import portfolio
from src.loan_status import loanStatus
from src.benefactLimit import BenefactLimit
from src.benefactHealth import BenefactHealth
from src.benefactorsList import benefactorsList

app = Flask(__name__)

@app.route('/BenefactPythonServer', methods = ['GET', 'POST'])
def getloanDetails():
    arguments = request.args
    _amount = float(arguments['amount'])
    _tenure = int(arguments['tenure'])
    _roi = int(arguments['roi'])
    lc = loanCalculator(_amount, _tenure, _roi)
    response = jsonify(lc.loan().to_json(orient='records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/BenefactPythonServer/portfolio', methods = ['GET', 'POST'])
def fetchPortfolio():
    arguments = request.args
    _emp = arguments['emp']
    pf = portfolio(_emp)
    response = jsonify(pf.fetchPortfolio().to_json(orient='records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/BenefactPythonServer/loanstatus', methods = ['GET', 'POST'])
def fetchLoanStatus():
    arguments = request.args
    _emp = arguments['emp']
    pf = loanStatus(_emp)
    response = jsonify(pf.fetchLoanStatus().to_json(orient='records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/BenefactPythonServer/benefactLimit', methods = ['GET', 'POST'])
def fetchbenefactLimit():
    arguments = request.args
    _emp = arguments['emp']
    bl = BenefactLimit(_emp)
    response = jsonify(bl.fetchbenefactLimit().to_json(orient='records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/BenefactPythonServer/benefactHealth', methods = ['GET', 'POST'])
def fetchbenefactHealth():
    arguments = request.args
    _emp = arguments['emp']
    bh = BenefactHealth(_emp)
    response = jsonify(bh.fetchbenefactHealth().to_json(orient='records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/BenefactPythonServer/fetchBenefactors', methods = ['GET', 'POST'])
def fetchBenefactors():
    arguments = request.args
    _emp = arguments['emp']
    bnl = benefactorsList(_emp)
    response = jsonify(bnl.fetchBenefactors().to_json(orient='records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)

