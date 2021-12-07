import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { DashboardService } from '../../../@dashboard/services/dashboard.service';

@Component({
  selector: 'ngx-list-workorderopenlist',
  styleUrls: ['./workorderopenlist.component.scss'],
  templateUrl: './workorderopenlist.component.html',
})
export class DashboardWorkOrderOpenListComponent implements OnDestroy {
  @Input()
  LocationId = '';

  public openWorkOrders;

  private alive = true;
  currentTheme: string;

  constructor(
    private themeService: NbThemeService,
    private dashboardService: DashboardService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

    this.getUserActivity();
  }

  getUserActivity() {
    this.dashboardService.get('WorkOrderOpen', this.LocationId, '').subscribe(data => {
      this.openWorkOrders = data;
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
