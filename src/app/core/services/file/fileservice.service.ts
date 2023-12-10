import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import * as moment from "moment";
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService extends BaseService {


  upload(file: File) {
    const formData = new FormData();  
        
    // Store form name as "file" with file data 
    formData.append("file", file, file.name); 
      
    // Make http post request over api 
    // with formData as req 
    return this.http.post(this.url + '/file/upload_stock_csv', formData) 
  }

  getStockList() {
    return this.http.get<any>(this.url + '/file/stock_list', this.getHeader());
  }


}
