import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signIn = {
    email: '',
    password: ''
  };

  public loading = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  // primera functionque se ejecuta
  ngOnInit() {

   }

  goHome() {
    if (!this.loading) {
      this.router.navigate(['/']);
    }
  }

  submitForm(event) {
    event.preventDefault();
    this.loading = true;
    //  : any[]
    this.authenticationService.signIn(this.signIn).then((data: string) => {
      this.authenticationService.storeToken(data);
      this.router.navigate(['/administrator/contests']);
    }).catch(err => {
      this.loading = false;
      // alerta del navegador
      window.alert(err);
    });
  }

}
