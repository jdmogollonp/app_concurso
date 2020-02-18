import { Component, OnInit } from '@angular/core';
import { ConstestAdministrationService } from 'src/app/services/contest-administration/constest-administration.service';

@Component({
  selector: 'app-contests-administration',
  templateUrl: './contests-administration.component.html',
  styleUrls: ['./contests-administration.component.scss']
})
export class ContestsAdministrationComponent implements OnInit {

  constructor(private contestAdministrationService: ConstestAdministrationService ) { }

  ngOnInit() {
    this.contestAdministrationService.getContests().then(data => {
      console.log(data)
    } ).catch(err => {
      window.alert(err);
    });
  }
}
