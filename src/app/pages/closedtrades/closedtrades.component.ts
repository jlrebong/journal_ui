import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PortfolioService } from 'src/app/core/services/porfolio/portfolio.service';
import { TradesService } from 'src/app/core/services/porfolio/trades.service';

@Component({
  selector: 'app-closedtrades',
  templateUrl: './closedtrades.component.html',
  styleUrls: ['./closedtrades.component.css']
})
export class ClosedtradesComponent {
  portfolio:any = {
    id: 0,
    name:"Portfolio",
    total_cash: 0,
  };

  tradelist!: any;

  constructor(
    private fb: FormBuilder,
    private portSvc: PortfolioService,
    private tradeSvc: TradesService,
  ) {
    this.getPortfolio();
  }

  getClosedTradeList() {
    return this.tradelist.filter((e:any) => e.closed == 1 || e.closed == true);
  }

  updateList($e:any) {
    this.getPortfolio();
  }

  getPortfolio() {
    let self = this;
    this.portSvc.getPortfolio().subscribe({
      next(res) { 

        self.portfolio = res.data;
        self.tradelist=res?.data?.trades;
      },
      error(err) { 
      },
      complete() { }
    });
  }


}
