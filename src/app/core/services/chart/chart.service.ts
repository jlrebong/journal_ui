import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService extends BaseService {

  getChart(symbol: string) {
    return this.get('/charts/simple/' + symbol);
  }
}
