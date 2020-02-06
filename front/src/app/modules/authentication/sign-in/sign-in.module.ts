// --------- Components --------- //
import { SignInComponent } from '../../../components/authentication/sign-in/sign-in.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInRoutingModule } from './sign-in.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule
  ]
})
export class SignInModule { }
