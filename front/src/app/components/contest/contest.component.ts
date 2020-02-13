import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestService } from 'src/app/services/contest/contest.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  public url = '';

  videos: any = [];

  constructor(private activatedRoute: ActivatedRoute, private contestService: ContestService) {
    this.url = this.activatedRoute.snapshot.params.url;
  }


  ngOnInit() {
    this.contestService.getVideos(this.url).then(data => {
      this.videos = data;
    }).catch(err => {
        window.alert(err);
      });

  }





}
