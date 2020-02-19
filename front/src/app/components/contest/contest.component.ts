import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestService } from 'src/app/services/contest/contest.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {
  require: any;
  url = '';
  videos: any = [];
  contest: any = [];
  admistatorInfo: any;
  closeResult: string;
  loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contestService: ContestService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.url = this.activatedRoute.snapshot.params.url;
    this.admistatorInfo = this.authenticationService.getTokenInformation();
  }


  ngOnInit() {
    this.loadContest();
  }

  loadContest() {
    this.contestService.getContest(this.url).then(data => {
      this.contest = data;
      this.loading = false;
    }).catch(err => {
      window.alert(err);
      this.router.navigate(['']);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
