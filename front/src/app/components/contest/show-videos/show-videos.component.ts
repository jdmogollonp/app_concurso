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
  pager = {
    pages: []
  };
  videos = [];

  loading = true;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.adminInfo) {
      this.activatedRoute.queryParams.subscribe(x => this.loadPageAdmin(x.page || 1));
    } else {
      this.activatedRoute.queryParams.subscribe(x => this.loadPageUsers(x.page || 1));
    }
  }

  private loadPageUsers(page) {
    this.loading = true;
    this.http.get<any>(`${this.apiUrl}${this.url}/videos/users?page=${page}`).subscribe(x => {
      this.loading = false;
      this.pager = x.pager;
      this.videos = x.data;
    });
  }


  private loadPageAdmin(page) {
    this.loading = true;
    this.http.get<any>(`${this.apiUrl}${this.url}/videos?page=${page}`).subscribe(x => {
      this.loading = false;
      this.pager = x.pager;
      this.videos = x.data;
    });
  }

  downloadFile() {
    let link = document.createElement("a");
    link.download = "Video Of Bokeh Lights.mp4";
    link.href = "assets/";
    link.click();
  }
}
