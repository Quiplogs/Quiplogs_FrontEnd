import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
    selector: 'ngx-charts-workorder-histoiry',
    template: `
        <chart type="pie" [data]="data" [options]="options"></chart>
    `,
})
export class ChartsWorkOrderHistoryComponent implements OnDestroy {
    data: any;
    options: any;
    themeSubscription: any;

    constructor(private theme: NbThemeService) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;

            this.data = {
                labels: ['Open', 'In Progress', 'Closed'],
                datasets: [{
                    data: [2, 1, 8],
                    backgroundColor: ['#C72910', '#E8A93F', '#007A7B'],
                }],
            };

            this.options = {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            display: false,
                        },
                    ],
                    yAxes: [
                        {
                            display: false,
                        },
                    ],
                },
                legend: {
                    labels: {
                        fontColor: chartjs.textColor,
                    },
                },
            };
        });
    }

    ngOnDestroy(): void {
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
        }
    }
}
