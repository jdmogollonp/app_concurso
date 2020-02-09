import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsAdministrationComponent } from 'src/app/components/contests-administration/contests-administration.component';
import { ContestsAdministrationRoutingModule } from './contests-administration.routing.module';
import { CreateContestComponent } from '../../components/contests-administration/create-contest/create-contest.component';

@NgModule({
  declarations: [ContestsAdministrationComponent, CreateContestComponent],
  imports: [
    CommonModule,
    ContestsAdministrationRoutingModule
  ]
})
export class ContestsAdministrationModule { }
