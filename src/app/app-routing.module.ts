import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerBillComponent } from './customer-bill/customer-bill.component';
import { BlockchainDemoComponent } from './blockchain-demo/blockchain-demo.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';

const routes: Routes = [
   { path: 'customerRegister', component: CustomerFormComponent },
   { path: 'customerInfo', component: CustomerInfoComponent },
   { path: 'customerBill', component: CustomerBillComponent },
   { path: 'blockchainDemo', component: BlockchainDemoComponent },
   { path: "", redirectTo: 'customerInfo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
