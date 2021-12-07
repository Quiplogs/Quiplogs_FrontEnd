import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  pager = {};
  pageOfItems = [];

  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
}
