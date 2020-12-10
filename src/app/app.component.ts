import { Component, NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-root',
  // template:`
  // <div>
  //   <h1>{{pageTitle}}</h1>
  //   <p-panel header="Board"></p-panel>
  // </div>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'chess';
  user: string = "white";
  isDisabled: boolean = false;
}
