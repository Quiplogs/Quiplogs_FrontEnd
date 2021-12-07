import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../../@dashboard/services/dashboard.service';

@Component({
  selector: 'ngx-dashboard-textheader',
  styleUrls: ['./textheader.component.scss'],
  templateUrl: './textheader.component.html',
})
export class DashboardTextHeaderComponent implements OnInit {
  @Input()
  LocationId = '';

  public TotalAssets: number = 0;
  public TotalAssetsInMaintenance: number = 0;
  public TotalWorkOrdersOpen: number = 0;
  public TotalWorkOrdersCompleted: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.get('TextHeader', this.LocationId, '').subscribe(data => {
      this.TotalAssets = data[0].TotalAssets;
      this.TotalAssetsInMaintenance = data[0].TotalAssetsInMaintenance;
      this.TotalWorkOrdersOpen = data[0].TotalWorkOrdersOpen;
      this.TotalWorkOrdersCompleted = data[0].TotalWorkOrdersCompleted;
    });
  }
}
