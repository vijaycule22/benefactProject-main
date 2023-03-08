from loanCalculator import loanCalculator


lc = loanCalculator(100000, 12, 10)

df = lc.loan()

print(df)

