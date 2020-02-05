// --------- Components --------- //
import { SignUpComponent } from 'src/app/components/authentication/sign-up/sign-up.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
