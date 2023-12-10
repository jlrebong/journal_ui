import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Trades } from '../../models/trades';

@Injectable({
  providedIn: 'root'
})
export class TradesService extends BaseService {

  getCurrentTrades(portfolio_id:number) {
    return this.get('/trades/get_current/' + portfolio_id);
  }

  getClosedTrades(portfolio_id:number) {
    return this.get('/trades/get_closed/' + portfolio_id);
  }

  getTradeById(trade_id:number) {
    return this.get('/trades/get/' + trade_id);
  }

  save(data:Trades) {
    return this.post(data, '/trades/save/');
  }
}
