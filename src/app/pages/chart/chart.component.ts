import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ChartService } from 'src/app/core/services/chart/chart.service';
import { FileserviceService } from 'src/app/core/services/file/fileservice.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  stocks: any = [];
  filteredOptions!: Observable<string[]>;
  stocklist:any;

  // @ts-ignore
  form: FormGroup;

  chartImage!: string;

  analyzing:boolean=false;

  @ViewChild('iframe') iframe!: ElementRef;
  
  constructor(
    private file_service: FileserviceService,
    private fsvc: FileserviceService,
    private fb: FormBuilder,
    private chartSvc: ChartService
  ) {
    this.file_service.getStockList().subscribe((list) => {
      this.stocks = list;
    })

    this.form = this.fb.group({
      symbol: [''],
    });
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

  autoCompleteFilter(field: any, options: Array<any>): Observable<any[]> {
    return field.valueChanges.pipe(startWith(''), map((value: any) => {
      return options.filter((option: any) => {
        return option?.toLowerCase().includes(value?.toLowerCase())
      });
    }));
  }

  onAnalyze() {
    if (this.analyzing) return;

    let symbol = this.form.get('symbol')?.value
    this.analyzing=true;
    
    let self = this;
    this.chartSvc.getChart(symbol).subscribe({
      next(data) { 
        const doc = self.iframe.nativeElement.contentDocument || self.iframe.nativeElement.contentElement.contentWindow;

        self.iframe.nativeElement.style.height='80vh';
        self.iframe.nativeElement.style.width='70vw';
        doc.open();
        doc.write(data);
        doc.close();

      },
      error(err) { console.log(err); self.analyzing=false; },
      complete() { self.analyzing=false; }
    });
  }

  buttonClasses() {
    if (this.analyzing) {
      return 'btn-disabled';
    } else {
      return 'btn btn-primary';
    }
  }

}
