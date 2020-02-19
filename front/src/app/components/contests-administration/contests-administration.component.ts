import { Component, OnInit } from '@angular/core';
import { ConstestAdministrationService } from 'src/app/services/contest-administration/constest-administration.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contests-administration',
  templateUrl: './contests-administration.component.html',
  styleUrls: ['./contests-administration.component.scss']
})
export class ContestsAdministrationComponent implements OnInit {
  closeResult: string;
  constructor(private contestAdministrationService: ConstestAdministrationService, private modalService: NgbModal ) { }
 contests = [];
  ngOnInit() {
    this.contestAdministrationService.getContests().then((data:Array<any>) => {
      console.log(data)
      this.contests = data
    } ).catch(err => {
      window.alert(err);
    });
  }
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
}
