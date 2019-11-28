import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../services/customer-services.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer = new Customer();

  departmentArray:{ name: string , value: string }[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

  }

  register() {

    event.preventDefault();
    console.log(this.customer);
    console.log("Got data");

    
    this.customerService.createCustomer(this.customer)
    .subscribe(
      data => {
        console.log("data after response");
        console.log(data);
        if( data.status === 200 || data.status === 201 )
        {
          swal.fire(
            {
              title: "Empresa registrada",
              type: "success",
              text: ""
            }
          );

          let myForm = <HTMLFormElement>document.getElementById('customerForm');
          myForm.reset();

        }
      }
    );

  }

  getDepartments()
  {
    console.log("triggered");
    this.departmentArray = this.customer.pais === "CO" ?
    [{name: 'Cundinamarca', value: "33"}, {name: 'Medellin', value: "34"}] :
    [{name: 'Florida', value: "FL"}, {name: 'California', value: "CAL"}]

  }

  doiT()
  {
    console.log("do it");
    let myForm = <HTMLFormElement>document.getElementById('customerForm');
    myForm.submit();
  }

}
