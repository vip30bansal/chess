import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CountdownModule } from 'ngx-countdown';
import { MatIconModule } from '@angular/material/icon';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { TimerComponent } from './timer/timer.component';
import { WhiteBoardComponent } from './white-board/white-board.component';
import { BlackBoardComponent } from './black-board/black-board.component';
import { BoardMobileComponent } from './board-mobile/board-mobile.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MsgsComponent } from './msgs/msgs.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ChatboxComponent,
    TimerComponent,
    WhiteBoardComponent,
    BlackBoardComponent,
    BoardMobileComponent,
    HeaderComponent,
    MsgsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PanelModule,
    MatRadioModule,
    MatSlideToggleModule,
    CountdownModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatSidenavModule,
    RouterModule.forRoot([
      { path: 'msgs', component: MsgsComponent },
      { path: 'welcome', component: BoardComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
    //MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
