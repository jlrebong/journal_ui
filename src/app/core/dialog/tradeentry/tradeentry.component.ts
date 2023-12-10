import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trades } from '../../models/trades';
import { FileserviceService } from '../../services/file/fileservice.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-tradeentry',
  templateUrl: './tradeentry.component.html',
  styleUrls: ['./tradeentry.component.css']
})
export class TradeentryComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;

  trades!:Trades;

  preview!:boolean;

  stocklist:any;

  filteredOptions!: Observable<string[]>;

  constructor(
    private dialogRef: MatDialogRef<TradeentryComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder,
    private fsvc: FileserviceService,

  ) {
    
    this.trades = new Trades();
    if (data && data.trade) {
      this.trades.init(data.trade.data);
    }

    this.form = this.fb.group({
      status: [this.trades.status || 'N'],
      symbol: [this.trades.symbol  || '', [Validators.required]],
      direction: [this.trades.direction || 'long', [Validators.required]],
      strategy: [this.trades.strategy  || '', [Validators.required]],
      amount: [this.trades.amount || '0', [Validators.required]],
      sell_price: [this.trades.sell_price || '0', [Validators.required]],
      entry_price: [this.trades.entry_price || '0', [Validators.required]],
      target_price: [this.trades.target_price || '0', [Validators.required]],
      stop_price: [this.trades.stop_price || 0],
      rating: [this.trades.rating || ''],
      created_date: [this.trades.created_date || new Date()],
      closed_date: [this.trades.closed_date || ''],
      comments: [this.trades.comments  || ''],
    });

    if(data.preview) {
      this.form.disable();
    }

    this.preview = data.preview;
  
  }


  ngOnInit() {
    this.fsvc.getStockList().subscribe((list) => {
      this.stocklist = list.data.map((data:any)=>data.symbol);
      
      this.filteredOptions = this.autoCompleteFilter(
        this.form.controls['symbol'],
        this.stocklist
      );
    });
  }

  onEntryOut(e:any) {
    let status = this.form.get('status')?.value;
    let entry = this.form.get('entry_price')?.value;

    if (status == 'N') {
      this.form.get('sell_price')?.setValue(entry);
    }
  }


  onClose() {
    this.dialogRef.close(); // Close the dialog without saving anything
  }

  onSave() {
    if (this.form.get('status')?.value == 'C') {
      if(!this.form.get('sell_price')?.value || this.form.get('sell_price')?.value == 0) {
        this.form.get('sell_price')?.setValue('');
        this.form.get('sell_price')?.markAsTouched();
        return;
      }
    }

    this.trades.init(this.form.value);
    this.trades.closed = this.trades.status == 'C';
    if (!this.trades.status || this.trades.status == 'N') {
      this.trades.status='A';
    }

    if (this.trades.status == 'C') {
      this.trades.closed_date = new Date();
    }
    this.dialogRef.close(this.trades); 
  }

  onReopen() {
    this.trades.init(this.form.value);
    this.trades.closed = false;
    this.trades.status='A';
    this.dialogRef.close(this.trades); 
  }

  getTotalCost() {
    let entry = this.form.get('entry_price')?.value;
    let amount = this.form.get('amount')?.value;

    return Trades.getTotalCost(entry, amount);
  }

  getProfit():any {
    let entry = this.form.get('entry_price')?.value;
    let target = this.form.get('target_price')?.value;
    let amount = this.form.get('amount')?.value;
    
    if (!entry || !target || !amount) {
      return 0;
    }

    return Trades.getProfit(entry, target, amount);
  }

  getProfitPct() {
    if (isNaN(this.getProfit() / this.getTotalCost()))
      return 0;

    return ((this.getProfit() / this.getTotalCost()) * 100).toFixed(2);;
  }

  getLoss():any {

    let entry = this.form.get('entry_price')?.value;
    let stop = this.form.get('stop_price')?.value;
    let amount = this.form.get('amount')?.value
    
    if (!entry || !stop || !amount) {
      return 0;
    }
    

    return Trades.getLoss(entry, stop, amount);
  }

  getLossPct() {
    if (isNaN(this.getLoss() / this.getTotalCost()))
      return 0;

    return ((this.getLoss() / this.getTotalCost()) * 100).toFixed(2);
  }

  getRRR() {
    return 1;
  }

  getActualProfit() {
    
    let entry = this.form.get('entry_price')?.value;
    let sell = this.form.get('sell_price')?.value;
    let amount = this.form.get('amount')?.value;
    
    if (!entry || !sell || !amount) {
      return 0;
    }
    
    let buyCost =Trades.getProfit(entry, sell, amount);

    return buyCost;
  }

  getActualProfitPct() {
    return ((this.getActualProfit() / this.getTotalCost()) * 100).toFixed(2);
  }


  autoCompleteFilter(field: any, options: Array<any>): Observable<any[]> {
    return field.valueChanges.pipe(startWith(''), map((value: any) => {
      return options.filter((option: any) => {
        return option?.toLowerCase().includes(value?.toLowerCase())
      });
    }));
  }


}
