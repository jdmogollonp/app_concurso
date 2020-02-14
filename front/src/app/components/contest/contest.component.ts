import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestService } from 'src/app/services/contest/contest.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  public url = '';
  videos: any = [];
  contest: any = [];
  admistatorInfo: boolean = false;
  // admistatorInfo: any;
  constructor(private activatedRoute: ActivatedRoute, private contestService: ContestService, private router: Router, private authenticationService: AuthenticationService) {
    this.url = this.activatedRoute.snapshot.params.url;
  }


  ngOnInit() {
    this.loadContest();
    this.loadVideos();
    // this.administrator();
  }

  // administrator(){
  //   this.authenticationService.getTokenInformation().then((data:any) => {
  //     this.admistatorInfo = data;
  //     console.log(this.admistatorInfo)
  //   }).catch(err => {
  //     window.alert(err);
  //   });
  // }
  logOut() {
    this.authenticationService.logOut();
  }

  loadContest(){
    this.contestService.getContest(this.url).then(data => {
      this.contest = data;
    }).catch(err => {
      window.alert(err);
    });
  }
  loadVideos(){
    this.contestService.getVideos(this.url).then(data => {
      this.videos = data;
    }).catch(err => {
      window.alert(err);
    });
  }
}
