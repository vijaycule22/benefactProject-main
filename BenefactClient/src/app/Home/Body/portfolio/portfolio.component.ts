import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/Components/message';
import { BENEFACT_HEALTH } from 'src/app/Models/BENEFACT_HEALTH';
import { BENEFACT_LIMIT } from 'src/app/Models/BENEFACT_LIMIT';
import { LOAN_STATUS } from 'src/app/Models/LOAN_STATUS';
import { PORTFOLIO_DATA } from 'src/app/Models/PORTFOLIO_DATA';
import { VM_USER_INFO } from 'src/app/Models/VM_USER_INFO';
import { AtParConstants } from 'src/app/Shared/AtParConstants';
import { PortFolioService } from './portfolio.service';
var DashboardCharts = require('highcharts/highstock');
require('highcharts/modules/boost')(DashboardCharts);
require('highcharts/modules/data')(DashboardCharts);
require('highcharts/modules/accessibility')(DashboardCharts);
require('highcharts/modules/exporting')(DashboardCharts);
require('highcharts/modules/export-data')(DashboardCharts);
require('highcharts/highcharts-more')(DashboardCharts);
require('highcharts/modules/no-data-to-display')(DashboardCharts);
require('highcharts/modules/drilldown')(DashboardCharts);

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
    data: any;
    currentDate: Date = new Date();
    subscription: Subscription;
    loanStatus: LOAN_STATUS[] = [];
    portFolioData: PORTFOLIO_DATA[] = [];
    benefactHealth: BENEFACT_HEALTH[] = [];
    benefactLimit: BENEFACT_LIMIT[] = [];
    finalChartData: any[] = []
    currentValue: number;
    investmentValue: number;
    returnsValue: number;
    returnPercentage: number = 0;
    lstUserDetails: VM_USER_INFO;
    public msgs: Message[] = [];
    maxBenefactHealthList: any[] = [];
    currentBenefactHealthList: any[] = [];


    constructor( private portfolioService: PortFolioService,
        private AtparConstants: AtParConstants, private location: LocationStrategy) {
        history.pushState(null, null, window.location.href);
        this.location.onPopState(() => {
            history.pushState(null, null, window.location.href);
        });
    }

    async ngOnInit() {
        let details = JSON.parse(localStorage.getItem("UserDetails"));
        this.lstUserDetails = details;
        await this.getLoanStatusData(this.lstUserDetails.EMPLOYEE_ID);
        await this.getPortfolioData(this.lstUserDetails.EMPLOYEE_ID);
        await this.getBenefactHealth(this.lstUserDetails.EMPLOYEE_ID);
        await this.getBenefactLimit(this.lstUserDetails.EMPLOYEE_ID);
        //this.returnPercentage = (this.investmentValue / this.returnsValue) * 100;
        this.createChart()
    }


    createChart() {
        var lineChart = new DashboardCharts.stockChart('container', {

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function () {
                        return this.value[this.pos - 1];
                    }
                },

                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent',
                    showInNavigator: true
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
                valueDecimals: 2,
                split: true
            },
            credits: {
                enabled: false
            },

            series: this.finalChartData[0]
        });


        var pieCahrt = new DashboardCharts.chart('pieCahrt', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'available',
                    y: this.benefactLimit[0].LIMIT_AVAILABLE,
                    // sliced: true,
                    // selected: true
                }, {
                    name: 'credit',
                    y: this.benefactLimit[0].CREDIT_LIMIT
                }, {
                    name: 'loan',
                    y: this.benefactLimit[0].LOAN_SHARE
                },
                {
                    name: 'Surety',
                    y: this.benefactLimit[0].SURETY_SHARE
                },]
            }]
        });


        var lineChart3 = new DashboardCharts.chart('barChart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Loan', 'Surety']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Goals'
                }
            },
            legend: {
                reversed: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'used Limit',
                data: this.currentBenefactHealthList
            }, {
                name: 'Available Limit',
                data: this.maxBenefactHealthList[0]
            },]

        });
    }

    async getLoanStatusData(empId: string) {
        try {

            await this.portfolioService.getLoanStatus(empId).then(res => {
                let data = res as any;
                let parsedData = JSON.parse(data)
                
                let objStatus: LOAN_STATUS;
                parsedData.forEach(element => {
                    objStatus = new LOAN_STATUS();
                    const time = + `/Date(${element.Payment_date})/`.replace(/\D/g, "");
                    objStatus.PAYMENT_DATE = new Date(time);
                    objStatus.EMI_Amount = element.EMI_Amount;
                    objStatus.EMI_STATUS = element.EMI_status;
                    this.loanStatus.push(objStatus)
                });
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getLoanStatusData')
        }
    }

    async getPortfolioData(empId: string) {
        try {
            await this.portfolioService.getPortfolio(empId).then(res => {
                let data = res as any;
                let parsedData = JSON.parse(data);
                let obj: PORTFOLIO_DATA;
                parsedData.forEach(element => {
                    obj = new PORTFOLIO_DATA;
                    obj.EMPLOYEE_ID = element.Employee_ID
                    obj.INVEST = element.Invest;
                    obj.RETURNS = element.Returns;
                    obj.TOTAL_EARN = element.Total_earn
                    obj.INVESTMENT_DATE = element.Investment_date;
                    obj.CUMULATIVE_EARN = element.Cumulative_earn;
                    obj.CUMULATIVE_INVEST = element.Cumulative_invest;
                    obj.CUMULATIVE_RETURNS = element.Cumulative_returns;
                    this.portFolioData.push(obj)
                });
            })

            this.filterPortFolioData();
            this.currentValue = this.portFolioData[this.portFolioData.length - 1].CUMULATIVE_EARN;
            this.investmentValue = this.portFolioData[this.portFolioData.length - 1].CUMULATIVE_INVEST;
            this.returnsValue = this.portFolioData[this.portFolioData.length - 1].CUMULATIVE_RETURNS;
            this.returnPercentage = (this.returnsValue / this.investmentValue) * 100;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getPortfolioData')
        }

    }

    async getBenefactHealth(empId: string) {
        try {
            await this.portfolioService.getBenefactHealth(empId).then(res => {
                let data = res as any;
                let parsedData = JSON.parse(data);
                let obj: BENEFACT_HEALTH;
                parsedData.forEach(element => {
                    obj = new BENEFACT_HEALTH;
                    obj.MAX_NUMBER_OF_LOANS = element.Max_number_of_loans;
                    obj.MAX_NUMBER_OF_SURETY = element.Max_number_of_sureties;
                    obj.NO_OF_ACTIVE_LOANS = element.NO_OF_ACTIVE_LOANS;
                    obj.NO_OF_ACTIVE_SURETIES = element.NO_OF_ACTIVE_Sureties;
                    this.benefactHealth.push(obj)
                });
                
            })

           this.filterBenefactHealthChartData();
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getBenefactHealth')
        }

    }

    async getBenefactLimit(empId: string) {
        try {
            await this.portfolioService.getBenefactLimit(empId).then(res => {
                let data = res as any;
                let parsedData = JSON.parse(data);
                let obj: BENEFACT_LIMIT;
                parsedData.forEach(element => {
                    obj = new BENEFACT_LIMIT;
                    obj.CREDIT_LIMIT = element.CREDIT_LIMIT;
                    obj.LIMIT_AVAILABLE = element.LIMIT_AVAILABLE;
                    obj.LOAN_SHARE = element.LOAN_SHARE;
                    obj.SURETY_SHARE = element.SURETY_SHARE;
                    this.benefactLimit.push(obj)
                });
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getBenefactHealth')
        }

    }


    filterPortFolioData() {
        const earnList = this.portFolioData.map((ele) => [ele.INVESTMENT_DATE, ele.CUMULATIVE_EARN]);
        const investList = this.portFolioData.map((ele) => [ele.INVESTMENT_DATE, ele.CUMULATIVE_INVEST]);
        const returnList = this.portFolioData.map((ele) => [ele.INVESTMENT_DATE, ele.CUMULATIVE_RETURNS]);
    
        const cumulativeEarnObj = {
          data: earnList,
          name: 'Current Value',
        };
        const cumulativeInvestObj = {
          data: investList,
          name: 'Investment',
        };
        const cumulativeReturnObj = {
          data: returnList,
          name: 'Returns',
        };
    
        this.finalChartData.push([cumulativeEarnObj, cumulativeInvestObj, cumulativeReturnObj]);
      }


    filterBenefactHealthChartData() {
        this.benefactHealth.forEach(ele => {
            this.maxBenefactHealthList.push([(ele.MAX_NUMBER_OF_LOANS - ele.NO_OF_ACTIVE_LOANS), (ele.MAX_NUMBER_OF_SURETY - ele.NO_OF_ACTIVE_SURETIES)]);
            this.currentBenefactHealthList.push(ele.NO_OF_ACTIVE_LOANS, ele.NO_OF_ACTIVE_SURETIES);
        })
    }


    clientErrorMsg(ex, funName) {
        this.msgs = [];
        this.AtparConstants.catchClientError(this.msgs, "", ex.toString(), funName, this.constructor.name);
    }

}
