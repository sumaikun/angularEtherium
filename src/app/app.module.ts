import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { SidebarModule } from 'ng-sidebar';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerBillComponent } from './customer-bill/customer-bill.component';
import { BlockchainDemoComponent } from './blockchain-demo/blockchain-demo.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';

import { ModalModule } from 'ngx-bootstrap';
import { InvoiceModalComponent } from './Modals/invoice-modal/invoice-modal.component';
import { TrackingModalComponent } from './Modals/tracking-modal/tracking-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CustomerFormComponent,
    CustomerListComponent,
    CustomerBillComponent,
    BlockchainDemoComponent,
    CustomerInfoComponent,
    InvoiceModalComponent,
    TrackingModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule.forRoot(),
    FormsModule,
    ContenteditableModule,
    NgSelectModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
