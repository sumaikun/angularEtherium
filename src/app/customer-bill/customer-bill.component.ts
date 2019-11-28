import { Component, OnInit } from '@angular/core';
import { BillItem } from '../../models/BillItem';
import { Destinatary } from '../../models/Destinatary';
import { CustomerService } from '../services/customer-services.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-customer-bill',
  templateUrl: './customer-bill.component.html',
  styleUrls: ['./customer-bill.component.scss']
})
export class CustomerBillComponent implements OnInit {

  billItem:BillItem = new BillItem();

  billItems:BillItem[] = [];

  bill:any = { destinatary:new Destinatary() };

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

  }

  customerChange(customer)
  {
    console.log("on parent");
    console.log(customer);
    this.bill.customer = customer.nitEmpresa;
    console.log(this.bill);
  }

  sendBill()
  {



    if(this.bill.customer == null)
    {
      return swal.fire(
        {
          title: "Espera",
          type: "warning",
          text: "Debes asociar un cliente"
        });
    }


    if( this.bill.destinatary.first_name == null ||  this.bill.destinatary.last_name == null
        || this.bill.destinatary.email == null || this.bill.destinatary.phone == null
        || this.bill.destinatary.date == null || this.bill.destinatary.country == null
        || this.bill.destinatary.city == null || this.bill.destinatary.address == null
     )
    {
      return swal.fire(
        {
          title: "Espera",
          type: "warning",
          text: "Los datos de destinario no estan completos"
        });
    }

    if(this.billItems.length == 0)
    {
      return swal.fire(
        {
          title: "Espera",
          type: "warning",
          text: "Deben agregarse items al documento"
        });
    }
    else{
      let notReady = false;
      console.log(this.billItems);

      this.billItems.forEach(item => {

        notReady = item.description === "" || item.quantity === 0 || item.service === 0
        || item.size === "" || item.total === 0 || item.weigth === "" ? true : false ;

        if(notReady){
          return;
        }

      });

      if(notReady)
      {
        return swal.fire(
          {
            title: "Espera",
            type: "warning",
            text: "Todos los valores del item deben tener algun valor"
          });
      }

    }

    this.bill.items = this.billItems;

    console.log(this.bill);



    this.customerService.generateBill(this.bill)
    .subscribe(
      data => {
        console.log(data);
      }
    );

  }

  addRow()
  {
    const copy = { ...this.billItem };
    this.billItems.push(<BillItem>copy);

    console.log(this.billItems);
    //this.billItem.reset();

    setTimeout(function(){
      document.querySelector(".onlyNumbers").addEventListener("keypress", function (evt:any) {
          //console.log(evt);
          if (evt.which < 48 || evt.which > 57)
          {
              evt.preventDefault();
          }
      });
    }, 1000);

  }

  identifyItem(item)
  {
    console.log(this.billItems.indexOf(item));

    swal.fire({
      title: '¿Estas seguro?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.value) {
        this.billItems.splice(this.billItems.indexOf(item),1);
      }
    });

  }

}
