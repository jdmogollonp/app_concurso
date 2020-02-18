import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestService } from 'src/app/services/contest/contest.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {
  require: any;
  public url = '';
  videos: any = [];
  contest: any = [];
  admistatorInfo: any;
  closeResult: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contestService: ContestService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.url = this.activatedRoute.snapshot.params.url;
    this.admistatorInfo =  this.authenticationService.getTokenInformation();

  }


  ngOnInit() {
    this.loadContest();
    console.log(this.videos);
  }


  loadContest(){
    this.contestService.getContest(this.url).then(data => {
      this.contest = data;
      // this.loadVideos()
    }).catch(err => {
      window.alert(err);
    });
  }

  // loadVideos(){
  //   this.contestService.getVideos(this.url).then(data => {
  //     this.videos = data;
  //   }).catch(err => {
  //     window.alert(err);
  //   });
  // }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
