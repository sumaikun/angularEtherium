import { Component } from '@angular/core';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})

export class AppComponent {
   title = 'apes-customer';

   private _opened: boolean = false;

   private _toggleSidebar() {
     this._opened = !this._opened;
   }

}
