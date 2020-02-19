// --------- Components --------- //
import { CreateContestComponent } from '../../components/contests-administration/create-contest/create-contest.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsAdministrationComponent } from 'src/app/components/contests-administration/contests-administration.component';
import { ContestsAdministrationRoutingModule } from './contests-administration.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContestsAdministrationComponent, CreateContestComponent],
  imports: [
    CommonModule,
    ContestsAdministrationRoutingModule,
    FormsModule
  ]
})
export class ContestsAdministrationModule { }
