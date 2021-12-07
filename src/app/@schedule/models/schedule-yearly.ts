import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class ScheduleYearly {
    public id: string;
    public plannedMaintenanceId: string;
    public assetId: string;
    public dateLastProcessed: Date;
    public dateNextDue: Date;
    public type: string;
    public dateEnd: Date;
    public startDate: Date;
    public recurEvery: number;
    public recurrenceTime: Date;
    public recurrenceMonth: number;
    public recurrenceDay: number;

    public constructor(init?: Partial<ScheduleYearly>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class ScheduleYearlyAdapter implements Adapter<ScheduleYearly> {
    adapt(item: any): ScheduleYearly {
        const model = new ScheduleYearly();
        model.id = item.id;
        model.plannedMaintenanceId = item.plannedMaintenanceId;
        model.assetId = item.assetId;
        model.dateLastProcessed = item.dateLastProcessed;
        model.dateNextDue = item.dateNextDue;
        model.dateEnd = item.dateEnd;
        model.startDate = item.startDate;
        model.recurEvery = item.recurEvery;
        model.recurrenceTime = item.recurrenceTime;
        model.recurrenceMonth = item.recurrenceMonth;
        model.recurrenceDay = item.recurrenceDay;
        model.type = item.type;

        return model;
    }
}
