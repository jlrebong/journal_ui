import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TradesService } from '../services/porfolio/trades.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../services/dialog/dialogservice.service';
import { TradeentryComponent } from '../dialog/tradeentry/tradeentry.component';
import { Overlay } from '@angular/cdk/overlay';
import { Trades } from '../models/trades';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent {
  @Input() tradelist: any;
  @Input() portfolio_id: any;
  @Input() preview!: boolean;
  @Input() isClosedTrade: boolean=false;

  @Output()
  data = new EventEmitter();

  // @ts-ignore
  form: FormGroup;
  showErrorMessage:boolean = false;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private tradeService: TradesService,
  ) {}

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '800px';
    dialogConfig.autoFocus = false;
    
    let trade = new Trades();

    trade.portfolio_id = this.portfolio_id;
    dialogConfig.data = {
      trade: trade,
      preview: this.preview
    };

    return dialogConfig;
  }

  openNewDialog() {

    this.dialogService.setIsDialogOpen();

    const dialogConfig = this.getDialogConfig();

    const dialogRef = this.dialog.open(TradeentryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        let self = this;
        data['portfolio_id']=this.portfolio_id;
        
        this.tradeService.save(data).subscribe({
          next(res) { self.data.emit(true); },
          error(err) { self.showErrorMessage = true; },
          complete() { }
        });
      }
      this.dialogService.setIsDialogOpen();
    });
  }

  openEditDialog(trade_id:any) {
    this.dialogService.setIsDialogOpen();

    const dialogConfig = this.getDialogConfig();

    this.tradeService.getTradeById(trade_id).subscribe((res)=>{

      let trade = new Trades();
      trade.init(res);
      // dialogConfig.data.data = trade;

      dialogConfig.data = {
        trade: trade,
        preview: this.preview
      };

      const dialogRef = this.dialog.open(TradeentryComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          let self = this;
          this.tradeService.save(data).subscribe({
            next(res) { 
              self.data.emit({
                closed: data.closed,
                amount: data.amount,
                entry_price: data.entry_price,
                sell_price: data.sell_price,
              }); 
            },
            error(err) { self.showErrorMessage = true; },
            complete() {  }
          })
        }
        this.dialogService.setIsDialogOpen();
      });
    });
    
  }

  computeProfit(entry:any, target:any, amount:any) {
    return Trades.getProfit(entry, target, amount);
  }

  computeLoss(entry:any, stop:any, amount:any) {
    return Trades.getLoss(entry, stop, amount);
  }

  computeGross(entry:any, amount:any) {
    return Trades.getTotalCost(entry, amount);
  }

  

  
}
