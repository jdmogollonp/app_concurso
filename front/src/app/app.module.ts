import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContestService } from './services/contest/contest.service';
import { ConstestAdministrationService }  from './services/contest-administration/constest-administration.service'
// import { ShowVideosComponent } from './components/contest/components/contest/show-videos/show-videos.component';
// Pagination Module
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ContestService,
    ConstestAdministrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
