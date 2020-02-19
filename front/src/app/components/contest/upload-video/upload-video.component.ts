import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContestService } from 'src/app/services/contest/contest.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  @Input() url: string;

  @Output() closeModal = new EventEmitter<boolean>();

  public loading = false;

  public videoUpload = {
    email: '',
    name: '',
    lastName: '',
    message: ''
  };

  public uploadedVideo: File;

  constructor(private contestService: ContestService) { }

  ngOnInit() {
  }

  getFileDetails(event: any) {
    this.uploadedVideo = event.target.files[0];
  }

  submitForm(event) {
    event.preventDefault();
    this.loading = true;
    this.contestService.uploadVideo(this.url, this.uploadedVideo, this.videoUpload).then((data: string) => {
      this.loading = false;
      window.alert(data);
      this.videoUpload.message = '';
      this.uploadedVideo = null;
      this.closeModal.emit(true);
    }).catch(err => {
      this.loading = false;
      window.alert(err);
    });
  }

}
