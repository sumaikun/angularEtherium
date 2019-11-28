import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../services/customer-services.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList:Customer[] = [];
  selectedCustomer:any;

  @Output()
  selectedEmitter: EventEmitter<Customer> = new EventEmitter<Customer>();

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers()
    .subscribe(
      data => {
          console.log(data);
          this.customerList = data;
        }
    );
  }

  changeSelected(){
    console.log("change selected");
    console.log(this.selectedCustomer);
    this.selectedEmitter.emit(this.selectedCustomer);
  }

}
