import { Component, Input, OnInit } from '@angular/core';
import { DialogEditScheduleComponent } from '../dialog-edit-schedule/dialog-edit-schedule.component';
import { DialogDeleteComponent } from '../../../@shared/components/dialog-delete/dialog-delete.component';
import { NbDialogService } from '@nebular/theme';

import {
    ScheduleCustomService,
    ScheduleDailyService,
    ScheduleWeeklyService,
    ScheduleMonthlyService,
    ScheduleYearlyService,
} from '../../services';
import { formatDate } from '@angular/common';

@Component({
    selector: 'ngx-schedule-component',
    styleUrls: ['./schedule.component.scss'],
    templateUrl: './schedule.component.html',
})

export class ScheduleComponent implements OnInit {
    @Input()
    PlannedMaintenanceId: string;
    @Input()
    AssetId: string;
    @Input()
    AssetUom: string;

    public schedules = [];
    constructor(
        private dialogService: NbDialogService,
        private scheduleCustomService: ScheduleCustomService,
        private scheduleDailyService: ScheduleDailyService,
        private scheduleWeeklyService: ScheduleWeeklyService,
        private scheduleMonthlyService: ScheduleMonthlyService,
        private scheduleYearlyService: ScheduleYearlyService,
    ) { }

    ngOnInit() {
        this.LoadSchedules();
    }

    private LoadSchedules() {
        this.scheduleCustomService.getList(this.PlannedMaintenanceId).subscribe(data => {
            this.PushSchedules(data);
        });
        this.scheduleDailyService.getList(this.PlannedMaintenanceId).subscribe(data => {
            this.PushSchedules(data);
        });
        this.scheduleWeeklyService.getList(this.PlannedMaintenanceId).subscribe(data => {
            this.PushSchedules(data);
        });
        this.scheduleMonthlyService.getList(this.PlannedMaintenanceId).subscribe(data => {
            this.PushSchedules(data);
        });
        this.scheduleYearlyService.getList(this.PlannedMaintenanceId).subscribe(data => {
            this.PushSchedules(data);
        });
    }

    private PushSchedules(data: any) {


        data.forEach(element => {
            if (element.type === 'Custom') {
                const displayModel = {
                    id: element.id,
                    type: element.type,
                    startAt: element.startingAt,
                    nextDue: element.cycleNextDue,
                };

                this.schedules.push(displayModel);
            } else {
                const displayModel = {
                    id: element.id,
                    type: element.type,
                    startAt: element.startDate,
                    nextDue: element.dateNextDue,
                };

                this.schedules.push(displayModel);
            }
        });
    }

    private PushSchedule(data: any) {

        if (data.type === 'Custom') {
            const displayModel = {
                id: data.id,
                type: data.type,
                startAt: data.startingAt,
                nextDue: data.cycleNextDue,
            };

            this.schedules.push(displayModel);

        } else {
            const displayModel = {
                id: data.id,
                type: data.type,
                startAt: data.startDate,
                nextDue: data.dateNextDue,
            };

            this.schedules.push(displayModel);
        }
    }

    delete(event, item) {
        this.dialogService.open(DialogDeleteComponent, {
            context: {
                type: 'Schedule',
                name: item.type + ', Next Due: ' + item.nextDue,
                id: item.id,
            },
        }).onClose.subscribe(id => {
            if (id) {
                switch (item.type) {
                    case 'Custom': {
                        this.scheduleCustomService.delete(id, true).subscribe(data => {
                            this.deleteScheduleFromList(id);
                        });
                    }
                        break;
                    case 'Daily': {
                        this.scheduleDailyService.delete(id, true).subscribe(data => {
                            this.deleteScheduleFromList(id);
                        });
                    }
                        break;
                    case 'Weekly': {
                        this.scheduleWeeklyService.delete(id, true).subscribe(data => {
                            this.deleteScheduleFromList(id);
                        });
                    }
                        break;
                    case 'Monthly': {
                        this.scheduleMonthlyService.delete(id, true).subscribe(data => {
                            this.deleteScheduleFromList(id);
                        });
                    }
                        break;
                    case 'Yearly': {
                        this.scheduleYearlyService.delete(id, true).subscribe(data => {
                            this.deleteScheduleFromList(id);
                        });
                    }
                        break;
                }
            }
        });
    }

    private deleteScheduleFromList(scheduleId: string) {
        const index = this.schedules.findIndex(({ id }) => id === scheduleId);
        if (index !== -1) {
            this.schedules.splice(index, 1);
        }
    }

    public addSchedule() {
        this.dialogService.open(DialogEditScheduleComponent, {
            context: {
                PlannedMaintenanceId: this.PlannedMaintenanceId,
                AssetId: this.AssetId,
                AssetUom: this.AssetUom,
            },
        }).onClose.subscribe(data => {
            if (data) {
                this.PushSchedule(data);
            }
        });
    }

    public editSchedule(event, item) {
        this.dialogService.open(DialogEditScheduleComponent, {
            context: {
                Id: item.id,
                Type: item.type,
                PlannedMaintenanceId: this.PlannedMaintenanceId,
                AssetId: this.AssetId,
                AssetUom: this.AssetUom,
            },
        }).onClose.subscribe(data => {
            if (data) {
                this.deleteScheduleFromList(item.id);
                this.PushSchedule(data);
            }
        });
    }

    public isNumber(val: Date): boolean {
        if (val) {

            const num = new Number(val);

            if (Number(num)) {
                return true;
            } else {
                return false;
            }
        }
    }
}
