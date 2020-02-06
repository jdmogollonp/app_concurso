// --------- Components --------- //
import { ContestsAdministrationComponent } from '../../components/contests-administration/contests-administration.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContestsAdministrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestsAdministrationRoutingModule { }
