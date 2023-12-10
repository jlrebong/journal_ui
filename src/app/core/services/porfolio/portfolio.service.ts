import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService extends BaseService {

  getPortfolio() {
    let user_id =localStorage.getItem('userid');
    return this.get('/portfolio/get_by_userid/' + user_id);
  }

  setTotalCash(id:any, cash: any) {
    let data = {
      portfolio_id: id,
      total_cash: cash
    }
    return this.post(data, '/portfolio/set-cash/');
  }

  addCash(id:any, type:string, cash: any, entry_date :string) {
    let data = {
      portfolio_id: id,
      add_cash: cash,
      type: type,
      entry_date: entry_date
    }
    return this.post(data, '/portfolio/add-cash/');
  }
}
