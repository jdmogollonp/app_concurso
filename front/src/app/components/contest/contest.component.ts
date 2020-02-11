import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  public url = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.url = this.activatedRoute.snapshot.params.url;
  }

  ngOnInit() {
  }

}
