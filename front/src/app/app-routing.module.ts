// --------- Components --------- //
import { HomeComponent } from './components/home/home.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --------- Guards --------- //
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated/not-authenticated.guard';

const routes: Routes = [
  {
    path: 'signIn',
    canLoad: [NotAuthenticatedGuard],
    loadChildren: () =>
      import('./modules/authentication/sign-in/sign-in.module').then(
        m => m.SignInModule
      )
  },
  {
    path: 'signUp',
    canLoad: [NotAuthenticatedGuard],
    loadChildren: () =>
      import('./modules/authentication/sign-up/sign-up.module').then(
        m => m.SignUpModule
      )
  },
  {
    path: 'administrator/contests',
    // guarda
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./modules/contests-administration/contests-administration.module').then(
        m => m.ContestsAdministrationModule
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
