import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-videos',
  templateUrl: './show-videos.component.html',
  styleUrls: ['./show-videos.component.scss']
})
export class ShowVideosComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}contests/`;
  @Input() adminInfo: any;
  @Input() url: string;
  pager = {};
  videos = [];

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.adminInfo){
      // load page based on 'page' query param or default to 1
      this.activatedRoute.queryParams.subscribe(x => this.loadPageAdmin(x.page || 1));
    }
    else{
      console.log('HOLA MANO QUe ES LA QUE HAY?')
      this.activatedRoute.queryParams.subscribe(x => this.loadPageUsers(x.page || 1));
    }
  }

  private loadPageUsers(page) {
    // get page of videos from api

    this.http.get<any>(`${this.apiUrl}${this.url}/videos/users?page=${page}`).subscribe(x => {
      console.log('HOLA MANO QUe ES LA QUE HAY? x2')
      this.pager = x.pager;
      this.videos = x.data;
    });
  }


  private loadPageAdmin(page) {
    // get page of videos from api
    this.http.get<any>(`${this.apiUrl}${this.url}/videos?page=${page}`).subscribe(x => {
      this.pager = x.pager;
      this.videos = x.data;
    });
  }

  downloadFile(){
    let link = document.createElement("a");
    link.download = "Video Of Bokeh Lights.mp4";
    link.href = "assets/";
    link.click();
  }


}
