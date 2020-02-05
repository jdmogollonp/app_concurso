// --------- Components --------- //
import { SignInComponent } from 'src/app/components/authentication/sign-in/sign-in.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
