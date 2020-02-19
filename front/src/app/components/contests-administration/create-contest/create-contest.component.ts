import { Component, OnInit, Input } from '@angular/core';
import { ConstestAdministrationService } from '../../../services/contest-administration/constest-administration.service'

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.scss']
})
export class CreateContestComponent implements OnInit {

    public loading = false;

    public contestUpload = {
      name: '',
      url: '',
      start_date: '',
      end_date: '',
      description: ''
    };

    public uploadedImage: File;


  constructor(private constestAdministrationService: ConstestAdministrationService) { }

  ngOnInit() {
  }

  getFileDetails(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  submitForm(event) {
    event.preventDefault();
    this.loading = true;
    this.constestAdministrationService.uploadContest(this.uploadedImage, this.contestUpload).then((data: string) => {
      window.scrollTo(0, 0);
      window.location.reload();
      this.loading = false;
      window.alert(data);
    }).catch(err => {
      this.loading = false;
      window.alert(err);
    });
  }

}
