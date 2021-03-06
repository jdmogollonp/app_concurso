// --------- Components --------- //
import { UploadVideoComponent } from '../../components/contest/upload-video/upload-video.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestComponent } from '../../components/contest/contest.component';
import { ContestRoutingModule } from './contest.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContestComponent, UploadVideoComponent],
  imports: [
    CommonModule,
    ContestRoutingModule,
    FormsModule
  ]
})
export class ContestModule { }
