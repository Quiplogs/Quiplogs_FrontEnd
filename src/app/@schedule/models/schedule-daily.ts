import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class ScheduleDaily {
    public id: string;
    public plannedMaintenanceId: string;
    public assetId: string;
    public dateLastProcessed: Date;
    public type: string;
    public dateNextDue: Date;
    public dateEnd: Date;
    public recurEvery: number;
    public startDate: Date;
    public recurrenceTime: Date;

    public constructor(init?: Partial<ScheduleDaily>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class ScheduleDailyAdapter implements Adapter<ScheduleDaily> {
    adapt(item: any): ScheduleDaily {
        const model = new ScheduleDaily();
        model.id = item.id;
        model.plannedMaintenanceId = item.plannedMaintenanceId;
        model.assetId = item.assetId;
        model.dateLastProcessed = item.dateLastProcessed;
        model.dateNextDue = item.dateNextDue;
        model.dateEnd = item.dateEnd;
        model.recurEvery = item.recurEvery;
        model.startDate = item.startDate;
        model.recurrenceTime = item.recurrenceTime;
        model.type = item.type;

        return model;
    }
}
