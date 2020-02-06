import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public token: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.token = this.authenticationService.getTokenInformation();
  }

  logOut() {
    this.authenticationService.logOut();
  }

}
