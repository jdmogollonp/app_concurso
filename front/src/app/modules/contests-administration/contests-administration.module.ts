import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsAdministrationComponent } from 'src/app/components/contests-administration/contests-administration.component';
import { ContestsAdministrationRoutingModule } from './contests-administration.routing.module';

@NgModule({
  declarations: [ContestsAdministrationComponent],
  imports: [
    CommonModule,
    ContestsAdministrationRoutingModule
  ]
})
export class ContestsAdministrationModule { }
