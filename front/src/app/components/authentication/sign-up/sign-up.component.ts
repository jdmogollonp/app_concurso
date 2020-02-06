import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUp = {
    email: '',
    name: '',
    lastName: '',
    password: '',
    passwordConfirmation: ''
  };

  public loading = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() { }

  goHome() {
    if (!this.loading) {
      this.router.navigate(['/']);
    }
  }

  submitForm() {
    this.loading = true;
    this.authenticationService.signUp(this.signUp).then((data: string) => {
      window.alert(data);
      this.router.navigate(['/']);
    }).catch(err => {
      this.loading = false;
      window.alert(err);
    });
  }

}
