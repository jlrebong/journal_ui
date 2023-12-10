import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class BaseService {

  protected url;

  constructor(protected http: HttpClient) { 
    let url = process.env["SERVICE_API"] || 'http://127.0.0.1:5000/api'; 
    this.url = url;
  }

  protected getHeader() {
    let token = localStorage.getItem('access_token');
    let options = {
      headers: new HttpHeaders(
        { 
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        }
      )
    };

    return options;
  }

  get(specificUrl:string):Observable<any> {
    return this.http.get<any>(this.url + specificUrl, this.getHeader());
  }

  post(data:any, specificUrl:string):Observable<any> {
    return this.http.post<any>(this.url + specificUrl, data, this.getHeader());
  }

}
