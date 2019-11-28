import { Component, OnInit, Inject } from '@angular/core';
import swal from'sweetalert2';
import { WEB3 } from '../injectors/web3';
import Web3 from 'web3';

import { ChangeDetectorRef } from '@angular/core';

//contracts
import * as ApesCustomers from '../../assets/Contracts/Customers.json';

@Component({
  selector: 'app-blockchain-demo',
  templateUrl: './blockchain-demo.component.html',
  styleUrls: ['./blockchain-demo.component.scss']
})
export class BlockchainDemoComponent implements OnInit {

  apesCustomersContract:any;
  userAccount:any;
  initialLoad:boolean = true;
  blockCustomers:any[] = [];
  //blkport:string = "5777";
  //blkport:string = "16510";
  blkport:string = "46860";

  constructor(@Inject(WEB3) private web3: Web3,
   private changeDetector: ChangeDetectorRef) {

  }

  async ngOnInit() {

    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }
    const accounts = await this.web3.eth.getAccounts();
    console.log(accounts);
    this.userAccount = accounts[0];
    console.log(ApesCustomers);


    let accountOptions = {
        from: this.userAccount, // default from address
        gasPrice: '3000000' // default gas price in wei, 20 gwei in this case
    }

    console.log(accountOptions);

    this.apesCustomersContract = new this.web3.eth.Contract(ApesCustomers.abi,
       ApesCustomers.networks[this.blkport].address);

    console.log(this.apesCustomersContract);

    const lastBlock = await this.web3.eth.getBlockNumber();

    console.log("last block "+lastBlock);

    this.apesCustomersContract.events.newCustomerRegistered( {fromBlock: 0 , toBlock: 'latest'},  function(error, event){
      console.log(error);
      console.log(event);
    })
      .on('data', (log) => {
        console.log(`log:`);
        console.log(log.type);
        let { returnValues: { _bussinesName, _bussinesid, _contactPhone, _createdAt }, blockNumber } = log

          console.log(`----BlockNumber (${blockNumber})----`)
          console.log(`_bussinesName = ${_bussinesName}`)
          console.log(`_bussinessId = ${_bussinesid}`)
          console.log(`_contactPhone = ${_contactPhone}`)
          console.log(`_createdAt = ${_createdAt}`)
          console.log(`----BlockNumber (${blockNumber})----`)

        this.blockCustomers.push(
          {
            bussinesName: _bussinesName,
            bussinessId: _bussinesid,
            contactPhone: _contactPhone
          }
        );

        //Obliga a la interfaz actualizarse
        this.changeDetector.detectChanges();

        if(blockNumber>lastBlock)
        {
          swal.fire(
            {
              title: "Cliente nuevo registrado",
              type: "success",
              text: ""
            }
          )
        }

      })
      .on('changed', (log) => {
        console.log(`Changed: ${log}`)
      })
      .on('error', (log) => {
        console.log(`error:  ${log}`)
      })



    /*this.apesCustomersContract.methods.Greet().send({ from: this.userAccount })
    .on("receipt", function(receipt) {
      console.log(receipt);
    })
    .on("error", function(error) {
      console.log(error)
    });*/

    /*let greeted = this.apesCustomersContract.methods.Greet().call().then(function(data) {
      console.log(data);
    }).catch(error => console.log(error) );*/

    let greeted = this.apesCustomersContract.methods.totalCustomers().call().then(function(data) {
      console.log("contract response");
      console.log(data);
    }).catch(error => console.log(error) );


    console.log(this.blockCustomers);
    console.log("finish on init");

  }

}


/*;*/
