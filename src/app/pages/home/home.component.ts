import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ChartOptions, Colors  } from 'chart.js';
import { TradesService } from 'src/app/core/services/porfolio/trades.service';
import { PortfolioService } from 'src/app/core/services/porfolio/portfolio.service';
import { Trades } from 'src/app/core/models/trades';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog/dialogservice.service';
import { AddcashComponent } from 'src/app/core/dialog/portfolio/addcash/addcash.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // @ts-ignore
  showErrorMessage:boolean = false;


  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ 'Cash'];
  public pieChartDatasets = [ {
    data: [ 100 ],
  } ];
  public pieChartLegend = false;
  public pieChartPlugins = [];

  private equityMap:any = {}

  // form data related
  // @ts-ignore
  form: FormGroup;

  userInfo!:any;

  portfolio:any = {
    id: 0,
    name:"Portfolio",
    total_cash: 0,
  };

  tradelist!: any;

  username = localStorage.getItem('username');

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private portSvc: PortfolioService,
    private tradeSvc: TradesService,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    this.getPortfolioData();
  }

  getPortfolioData() {
    let self = this;
    this.portSvc.getPortfolio().subscribe({
      next(res) { 
        self.portfolio=res?.data;  
        self.getTrades(self.portfolio.id);
        self.computePieData(self.tradelist);
      },
      error(err) { 
      },
      complete() {  }
    });
  }

  getTrades(portfolioId:number) {
    let self = this;
    this.tradeSvc.getCurrentTrades(portfolioId).subscribe({
      next(res) { 
        self.tradelist=res.data;  
        self.computePieData(self.tradelist);
      },
      error(err) {  },
      complete() { }
    });
  }

  updateList(e:any) {
    if(e && e.closed) {

      // need to update portfolio value here
      let profitLoss = Trades.getProfit(e.entry_price, e.sell_price, e.amount);
      let remaining = parseFloat(this.portfolio.total_cash) + parseFloat(profitLoss);
      
      this.portSvc.setTotalCash(this.portfolio.id, remaining).subscribe((e)=>{})
    }
    this.getPortfolioData();
  }

  getTotalEquity() {
    let totalEquity = 0;
    
    if (this.tradelist) {
      for(let trade of this.tradelist) {
        let gross = parseFloat(Trades.getTotalCost(trade.entry_price, trade.amount));
        this.equityMap[trade.symbol] = gross; 
        totalEquity += gross;
      }
    }

    return totalEquity;
  }

  computePieData(tradelist:any) {

    if (!tradelist) {
      return;
    }

    let totalEquity = 0;
    let equityMap:any={};
    for(let trade of this.tradelist) {
      let gross = parseFloat(Trades.getTotalCost(trade.entry_price, trade.amount));
      if (equityMap[trade.symbol]) 
          equityMap[trade.symbol]+= gross;
      else 
          equityMap[trade.symbol] = gross;

      totalEquity += gross;
    }

    let totalCashRemaining = (this.portfolio.total_cash - totalEquity) / this.portfolio.total_cash * 100;

    this.pieChartLabels = [ 'Cash' ];
    this.pieChartDatasets = [ {
      data: [ totalCashRemaining  ],
    } ];

    for (const symbol in equityMap) {
      let equityPct = 100 - ((this.portfolio.total_cash - equityMap[symbol]) / this.portfolio.total_cash * 100);
      this.pieChartDatasets[0].data.push(equityPct);
      this.pieChartDatasets[0].data = this.pieChartDatasets[0].data.slice();
      this.pieChartLabels.push(symbol);
    }
  }


  // This is for 
  onClickAddFunds(): any {
    const dialogRef = this.dialog.open(AddcashComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        let self = this;
        this.portSvc.addCash(this.portfolio.id, data["type"], data["cash_value"], data["entry_date"]).subscribe({
          next(res) { 
            self.getPortfolioData();
          },
          error(err) { self.showErrorMessage = true; },
          complete() {  }
        })
      }
    });
  }

}


