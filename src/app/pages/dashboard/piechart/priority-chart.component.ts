import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DashboardService } from '../../../@dashboard/services/dashboard.service';

@Component({
  selector: 'ngx-pie-priority',
  styleUrls: ['./piechart.component.scss'],
  template: `
    <nb-card>
        <nb-card-header>
            Open Work Orders - Priority
        </nb-card-header>
    <nb-card-body>
      <div *ngIf="!chartDdata.length" class="no-datadisplay">No Data To Display</div>
      <div echarts [options]="options" class="echart"></div>
    </nb-card-body>
  `,
})
export class PriorityChartComponent implements AfterViewInit, OnDestroy {
  @Input()
  LocationId = '';

  public chartDdata = [];

  options: any = {};
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private dashboardService: DashboardService) {
  }

  ngAfterViewInit() {
    this.dashboardService.get('WorkOrderPriority', this.LocationId, '').subscribe(data => {

      if (data[0].HighPriority > 0) {

        this.chartDdata.push({ value: data[0].HighPriority, name: 'High' });
      }
      if (data[0].MediumPriority > 0) {

        this.chartDdata.push({ value: data[0].MediumPriority, name: 'Medium' });
      }
      if (data[0].LowPriority > 0) {

        this.chartDdata.push({ value: data[0].LowPriority, name: 'Low' });
      }

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors = config.variables;
        const echarts: any = config.variables.echarts;
        this.options = {
          backgroundColor: echarts.bg,
          color: ['#800021', '#E8A93F', '#007A7B'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['High', 'Medium', 'Low'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Open Work Orders',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: this.chartDdata,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
