import { Component, OnInit , Inject, TemplateRef} from '@angular/core';
import { WEB3 } from '../injectors/web3';
import Web3 from 'web3';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//contracts
import * as Customers from '../../assets/Contracts/Customers.json';
import * as Invoice from '../../assets/Contracts/invoice.json';
import * as Items from '../../assets/Contracts/Items.json';
import * as Tracks from '../../assets/Contracts/TrackItems.json';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  customer:any = null;

  avaliableInvoices:any[] = [];

  invoicesGenerated:any[] = [];

  itemsRegistered:any[] = [];

  trackings:any[] = [];

  avaliableTracks:any[] = [];

  currentWatchingInvoice:any = {};

  CustomersContract: any;
  InvoiceContract: any;
  ItemsContract: any;
  TrackingContract:any;

  public modalRef: BsModalRef;

  //blkport:string = "5777";

  blkport:string = "46860";

  constructor(@Inject(WEB3) private web3: Web3,private modalService: BsModalService) {
    this.modalService.onHide.subscribe((reason: string) => {
      console.log(`onHide event has been fired`);
    });
  }

  async ngOnInit() {

    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }

    //wtf
    const accounts = await this.web3.eth.getAccounts();


    this.CustomersContract = new this.web3.eth.Contract(Customers.abi, Customers.networks[this.blkport].address);
    this.InvoiceContract = new this.web3.eth.Contract(Invoice.abi, Invoice.networks[this.blkport].address);
    this.ItemsContract = new this.web3.eth.Contract(Items.abi, Items.networks[this.blkport].address);
    this.TrackingContract = new this.web3.eth.Contract(Tracks.abi, Tracks.networks[this.blkport].address);

    this.InvoiceContract.events.invoiceGenerated( {fromBlock: 0 , toBlock: 'latest'},  function(error, event){
      console.log(error);
      console.log(event);
    })
      .on('data', (log) => {
        console.log(`log:`);
        console.log(log.type);


        let { returnValues: { date, transactionId, _customer, _destCity, _destCountry, _destDeliverAddress,
        _destName, _destPhone}, blockNumber } = log

          console.log(`----BlockNumber (${blockNumber})----`)
          console.log(`transaction = ${transactionId}`)
          console.log(`----BlockNumber (${blockNumber})----`)

          this.invoicesGenerated = [...this.invoicesGenerated, { date, transactionId, _customer, _destCity, _destCountry, _destDeliverAddress,
          _destName, _destPhone} ]

      }).on('changed', (log) => {console.log(`Changed: ${log}`)}).on('error', (log) => {console.log(`error:  ${log}`)});

      this.ItemsContract.events.newItemRegistered( {fromBlock: 0 , toBlock: 'latest'},  function(error, event){
        console.log(error);
        console.log(event);
      }).on('data', (log) => {
          console.log(`log:`);
          console.log(log.type);

          let { returnValues: { commercialValue, description, idTransaction, measures, quantity,
           serviceValue , weight }, blockNumber } = log

          console.log(`----BlockNumber (${blockNumber})----`)
          console.log(`_bussinesName = ${description}`)
          console.log(`----BlockNumber (${blockNumber})----`)

          this.itemsRegistered = [...this.itemsRegistered, { commercialValue, description, idTransaction, measures, quantity,
           serviceValue , weight } ]

        }).on('changed', (log) => {console.log(`Changed: ${log}`)}).on('error', (log) => {console.log(`error:  ${log}`)});

      this.TrackingContract.events.trackingRegistered( {fromBlock: 0 , toBlock: 'latest'},  function(error, event){
        console.log(error);
        console.log(event);
      }).on('data', (log) => {
          console.log(`log:`);
          console.log(log.type);


          let { returnValues: { customer, date, itemIdentification, location, reportSource,
           systemId , traceAction }, blockNumber } = log

          console.log(`----BlockNumber (${blockNumber})----`)
          console.log(`_itemIdentification = ${itemIdentification}`)
          console.log(`----BlockNumber (${blockNumber})----`)

          this.trackings = [...this.trackings, { customer, date, itemIdentification, location, reportSource,
           systemId , traceAction  } ]

        }).on('changed', (log) => {console.log(`Changed: ${log}`)}).on('error', (log) => {console.log(`error:  ${log}`)});



  }

  customerChange(customer)
  {
    if(!customer)
    {
      this.avaliableInvoices = [];
      return;
    }

    console.log("on parent");
    this.customer =  customer;

    //console.log(this.invoicesGenerated);
    //console.log(this.itemsRegistered);

    this.avaliableInvoices = [];
    this.avaliableTracks = [];

    this.invoicesGenerated.forEach( invoice => {

      console.log(invoice._customer);
      console.log(customer.nitEmpresa);

      if(customer.nitEmpresa.toString() === invoice._customer.toString())
      {
          this.avaliableInvoices = [...this.avaliableInvoices, invoice ];
      }

    })

    //avaliableTracks

    this.trackings.forEach( tracking => {

      if(customer.nitEmpresa.toString() === tracking.customer.toString())
      {
          this.avaliableTracks = [...this.avaliableTracks, tracking ];
      }

    })

    console.log(this.avaliableInvoices);

    console.log(this.avaliableTracks);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class: 'modal-lg'});

  }

  changeInvoice(data,template: TemplateRef<any>)
  {
    if(!data)
    {return;}

    console.log(data);
    this.modalRef = this.modalService.show(template,{class: 'modal-lg'});
    this.currentWatchingInvoice.destinatary = this.avaliableInvoices.filter(
       invoice => invoice.transactionId === data )[0];

    this.currentWatchingInvoice.items = this.itemsRegistered.filter(
      item => item.idTransaction === data
    )

    console.log(this.currentWatchingInvoice);

  }

  returnFormatedDate(unix_timestamp)
  {
    let date = new Date(unix_timestamp*1000).toISOString();
    console.log(date);
    return date.split('T')[0] + " " + date.split('T')[1].substring(0, 5);

  }

}
