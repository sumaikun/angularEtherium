import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../../models/Customer';
import swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private serverUrl =  "http://35.168.252.146:8000/";  //"http://localhost:8000/";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private blockchainUrl = this.serverUrl + 'blockchaindemo/';
  private blockchainApiUrl = this.serverUrl + 'blockchaindemo/api/';
  private demoUrl = this.serverUrl + 'demo/';

  constructor(private http: HttpClient) { }

  createCustomer(customer:Customer) : Observable<any> {
    //const options = { headers: this.headers , observe : 'response' };
    const url = `${ this.blockchainApiUrl }`+"customer/";

    return this.http.post<Customer>(url,customer,{ headers: this.headers ,
       observe : 'response' })
    .pipe(
      catchError(error =>
      {
        console.log("Error");
        console.log(error);
        swal.fire(
          {
            title: "Ha sucedido un error creando el cliente",
            type: "error",
            text: ""
          }
        );
        return of(null);
      })
    )
  }

  getCustomers() : Observable<any> {
    let options = { headers: this.headers };

    const url = `${ this.blockchainApiUrl }`+"customer/";

    return this.http.get<Customer>(url,options)
    .pipe(
      catchError(error =>
      {
        console.log("Error");
        console.log(error);
        swal.fire(
          {
            title: "Ha sucedido un error buscando los clientes",
            type: "error",
            text: ""
          }
        );
        return of(null);
      })
    )
  }


  generateBill(data) : Observable<any> {
    let options = { headers: this.headers };
    const url = `${this.blockchainUrl}`+"proformaInvoice";

    return this.http.post<Customer>(url,data,options)
    .pipe(
      catchError(error =>
      {
        console.log("Error");
        console.log(error);
        return of(null);
      })
    )
  }

  testData() : Observable<any> {
    let options = { headers: this.headers };
    const url = `${this.demoUrl}`+"articles";

    return this.http.get<Customer>(url,options)
    .pipe(
      catchError(error =>
      {
        console.log("Error");
        console.log(error);
        return of(null);
      })
    )
  }



}
