import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileserviceService } from 'src/app/core/services/file/fileservice.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;

  file!: File;

  stocks: any = [];

  constructor(
    private fb: FormBuilder,
    private file_service: FileserviceService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      file_upload: [''],
    });

    this.file_service.getStockList().subscribe((list) => {
      this.stocks = list;
    })
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    this.file_service.upload(this.file).subscribe((e)=>{
    })
  }

}
