// --------- Components --------- //
import { SignUpComponent } from '../../../components/authentication/sign-up/sign-up.component';

// --------- Modules --------- //
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './sign-up.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule
  ]
})
export class SignUpModule { }
