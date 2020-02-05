// --------- Components --------- //
import { HomeComponent } from './components/home/home.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'signIn',
    loadChildren: () =>
      import('./modules/authentication/sign-in/sign-in.module').then(
        m => m.SignInModule
      )
  },
  {
    path: 'signUp',
    loadChildren: () =>
      import('./modules/authentication/sign-up/sign-up.module').then(
        m => m.SignUpModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
