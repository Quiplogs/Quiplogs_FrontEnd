import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DashboardService } from '../../../@dashboard/services/dashboard.service';

@Component({
    selector: 'ngx-bargraph-totalmaintenancecompleted',
    template: `
    <nb-card>
        <nb-card-header>
            Work Orders Completed
        </nb-card-header>
    <nb-card-body>
        <div echarts [options]="options" class="echart"></div>
    </nb-card-body>
  `,
})
export class BarGraphTotalMaintenanceCompletedComponent implements AfterViewInit, OnDestroy {
    @Input()
    LocationId = '';

    options: any = {};
    themeSubscription: any;

    private bar_days: string[] = [];
    private bar_completed: number[] = [];

    constructor(
        private theme: NbThemeService,
        private dashboardService: DashboardService) {
    }

    ngAfterViewInit() {
        this.dashboardService.get('WorkOrdersCompletedByDayForWeek', this.LocationId, '').subscribe(data => {

            data.forEach(val => {
                this.bar_days.push(val.Day);
                this.bar_completed.push(val.TotalCompleted);
            });

            this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

                const colors: any = config.variables;
                const echarts: any = config.variables.echarts;
                this.options = {
                    backgroundColor: echarts.bg,
                    color: ['#003F5A'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.bar_days,
                            axisTick: {
                                alignWithLabel: true,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: echarts.axisLineColor,
                                },
                            },
                            axisLabel: {
                                textStyle: {
                                    color: echarts.textColor,
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: echarts.axisLineColor,
                                },
                            },
                            splitLine: {
                                lineStyle: {
                                    color: echarts.splitLineColor,
                                },
                            },
                            axisLabel: {
                                textStyle: {
                                    color: echarts.textColor,
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: 'Completed',
                            type: 'bar',
                            barWidth: '60%',
                            data: this.bar_completed,
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
