// --------- Components --------- //
import { ContestsAdministrationComponent } from '../../components/contests-administration/contests-administration.component';
import { CreateContestComponent } from '../../components/contests-administration/create-contest/create-contest.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContestsAdministrationComponent
  },
  {
    path: 'create',
    component: CreateContestComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestsAdministrationRoutingModule { }
