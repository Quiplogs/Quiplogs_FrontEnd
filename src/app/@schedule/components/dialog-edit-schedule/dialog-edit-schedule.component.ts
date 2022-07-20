import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ScheduleCustom } from '../../models/schedule-custom';
import { ScheduleDaily } from '../../models/schedule-daily';
import { ScheduleMonthly } from '../../models/schedule-monthly';
import { ScheduleWeekly } from '../../models/schedule-weekly';
import { ScheduleYearly } from '../../models/schedule-yearly';
import {
  ScheduleCustomService,
  ScheduleDailyService,
  ScheduleWeeklyService,
  ScheduleMonthlyService,
  ScheduleYearlyService,
} from '../../services';

@Component({
  selector: 'ngx-dialog-edit-schedule',
  templateUrl: 'dialog-edit-schedule.component.html',
  styleUrls: ['dialog-edit-schedule.component.scss'],
})
export class DialogEditScheduleComponent implements OnInit {

  @Input() Id: string;
  @Input() Type: string;
  @Input() PlannedMaintenanceId: string;
  @Input() AssetId: string;
  @Input() AssetUom: string;

  lblPut = 'Add';
  selectedSchedule = 'custom';

  // Forms
  public customScheduleForm: FormGroup;
  public dailyScheduleForm: FormGroup;
  public weeklyScheduleForm: FormGroup;
  public monthlyScheduleForm: FormGroup;
  public yearlyScheduleForm: FormGroup;

  public isCustom: boolean = true;
  public isDaily: boolean = false;
  public isWeekly: boolean = false;
  public isMonthly: boolean = false;
  public isYearly: boolean = false;

  public repeatHours = [];
  public repeatDays = [];
  public repeatMonths = [];
  public repeatYears = [];

  public ScheduleCustom: ScheduleCustom = new ScheduleCustom();
  public ScheduleDaily: ScheduleDaily = new ScheduleDaily();
  public ScheduleWeekly: ScheduleWeekly = new ScheduleWeekly();
  public ScheduleMonthly: ScheduleMonthly = new ScheduleMonthly();
  public ScheduleYearly: ScheduleYearly = new ScheduleYearly();

  recurrenceTimeSelected: string;
  recurrenceMonthSelected: string;
  recurrenceDaySelected: string;
  recurrenceYearSelected: string;

  public enableCustom: boolean = false;
  public enableDaily: boolean = false;
  public enableWeekly: boolean = false;
  public enableMonthly: boolean = false;
  public enableYearly: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private scheduleCustomService: ScheduleCustomService,
    private scheduleDailyService: ScheduleDailyService,
    private scheduleWeeklyService: ScheduleWeeklyService,
    private scheduleMonthlyService: ScheduleMonthlyService,
    private scheduleYearlyService: ScheduleYearlyService,
    protected ref: NbDialogRef<DialogEditScheduleComponent>) { }

  ngOnInit() {

    if (this.Id) {
      this.lblPut = 'Update';
    }

    this.GenerateDisplayDateTimeValues('hours', 24);
    this.GenerateDisplayDateTimeValues('days', 31);
    this.GenerateDisplayDateTimeValues('months', 12);
    this.GenerateDisplayDateTimeValues('years', 10);

    this.CreateForms();
    this.LoadSchedule();
  }

  private LoadSchedule() {
    this.setAllSectionsToFalse();

    switch (this.Type) {

      case 'Custom': {
        this.selectedSchedule = 'custom';
        this.isCustom = true;

        if (this.Id) {
          this.scheduleCustomService.get(this.Id).subscribe(data => {
            this.customScheduleForm.patchValue(data);

            this.enableCustom = false;
            this.enableDaily = true;
            this.enableWeekly = true;
            this.enableMonthly = true;
            this.enableYearly = true;
          });
        }
      }
        break;
      case 'Daily': {
        this.selectedSchedule = 'daily';
        this.isDaily = true;

        if (this.Id) {
          this.scheduleDailyService.get(this.Id).subscribe(data => {
            this.recurrenceTimeSelected = (new Date(data.recurrenceTime)).getHours().toString();
            this.dailyScheduleForm.patchValue(data);

            this.enableCustom = true;
            this.enableDaily = false;
            this.enableWeekly = true;
            this.enableMonthly = true;
            this.enableYearly = true;
          });
        }
      }
        break;
      case 'Weekly': {
        this.selectedSchedule = 'weekly';
        this.isWeekly = true;

        if (this.Id) {
          this.scheduleWeeklyService.get(this.Id).subscribe(data => {
            this.recurrenceTimeSelected = (new Date(data.recurrenceTime)).getHours().toString();
            this.weeklyScheduleForm.patchValue(data);

            this.enableCustom = true;
            this.enableDaily = true;
            this.enableWeekly = false;
            this.enableMonthly = true;
            this.enableYearly = true;
          });
        }
      }
        break;
      case 'Monthly': {
        this.selectedSchedule = 'monthly';
        this.isMonthly = true;

        if (this.Id) {
          this.scheduleMonthlyService.get(this.Id).subscribe(data => {
            this.recurrenceMonthSelected = data.recurEvery.toString();
            this.recurrenceDaySelected = data.recurrenceDay.toString();
            this.recurrenceTimeSelected = (new Date(data.recurrenceTime)).getHours().toString();
            this.monthlyScheduleForm.patchValue(data);

            this.enableCustom = true;
            this.enableDaily = true;
            this.enableWeekly = true;
            this.enableMonthly = false;
            this.enableYearly = true;
          });
        }
      }
        break;
      case 'Yearly': {
        this.selectedSchedule = 'yearly';
        this.isYearly = true;

        if (this.Id) {
          this.scheduleYearlyService.get(this.Id).subscribe(data => {
            this.recurrenceYearSelected = data.recurEvery.toString();
            this.recurrenceMonthSelected = data.recurrenceMonth.toString();
            this.recurrenceDaySelected = data.recurrenceDay.toString();
            this.recurrenceTimeSelected = (new Date(data.recurrenceTime)).getHours().toString();
            this.yearlyScheduleForm.patchValue(data);

            this.enableCustom = true;
            this.enableDaily = true;
            this.enableWeekly = true;
            this.enableMonthly = true;
            this.enableYearly = false;
          });
        }
      }
        break;
      default: {
        // set screen to custom on create
        this.selectedSchedule = 'custom';
        this.isCustom = true;
        break;
      }
    }
  }

  private CreateForms() {
    this.customScheduleForm = this.formBuilder.group({
      recurEvery: ['', Validators.required],
      startingAt: [''],
    });

    this.dailyScheduleForm = this.formBuilder.group({
      recurEvery: ['', Validators.required],
      recurrenceTime: ['', Validators.required],
      startDate: [''],
      endDate: [''],
    });

    this.weeklyScheduleForm = this.formBuilder.group({
      recurEvery: ['', Validators.required],
      recurrenceTime: ['', Validators.required],
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      sunday: [false],
      startDate: [''],
      endDate: [''],
    });

    this.monthlyScheduleForm = this.formBuilder.group({
      recurEvery: ['', Validators.required],
      recurrenceDay: ['', Validators.required],
      recurrenceTime: ['', Validators.required],
      startDate: [''],
      endDate: [''],
    });

    this.yearlyScheduleForm = this.formBuilder.group({
      recurEvery: ['', Validators.required],
      recurrenceMonth: ['', Validators.required],
      recurrenceDay: ['', Validators.required],
      recurrenceTime: ['', Validators.required],
      startDate: [''],
      endDate: [''],
    });
  }

  onChange(event) {

    this.setAllSectionsToFalse();

    if (event === 'custom') { this.isCustom = true; }
    if (event === 'daily') { this.isDaily = true; }
    if (event === 'weekly') { this.isWeekly = true; }
    if (event === 'monthly') { this.isMonthly = true; }
    if (event === 'yearly') { this.isYearly = true; }
  }

  private setAllSectionsToFalse() {
    this.isCustom = false;
    this.isDaily = false;
    this.isWeekly = false;
    this.isMonthly = false;
    this.isYearly = false;
  }

  cancel() {
    this.ref.close();
  }

  submit() {

    // check type and submit to correct API
    this.SubmitCustom();
    this.SubmitDaily();
    this.SubmitWeekly();
    this.SubmitMonthly();
    this.SubmitYearly();
  }

  private SubmitCustom() {
    if (this.isCustom) {
      if (this.customScheduleForm.invalid) {
        return;
      }
      this.ScheduleCustom = this.customScheduleForm.value;

      if (this.Id) {
        this.ScheduleCustom.id = this.Id;
      }
      this.ScheduleCustom.assetId = this.AssetId;
      this.ScheduleCustom.plannedMaintenanceId = this.PlannedMaintenanceId;

      this.scheduleCustomService.put(this.ScheduleCustom).subscribe(data => {
        this.customScheduleForm.reset();

        const model = {
          id: data.id,
          type: 'Custom',
          cycleNextDue: data.cycleNextDue,
          startingAt: data.startingAt,
        };

        this.ref.close(model);
      });
    }
  }

  private SubmitDaily() {
    if (this.isDaily) {
      if (this.dailyScheduleForm.invalid) {
        return;
      }
      this.ScheduleDaily = this.dailyScheduleForm.value;

      if (this.Id) {
        this.ScheduleDaily.id = this.Id;
      }
      this.ScheduleDaily.assetId = this.AssetId;
      this.ScheduleDaily.plannedMaintenanceId = this.PlannedMaintenanceId;
      this.ScheduleDaily.recurrenceTime = this.GetRecurranceTime(this.dailyScheduleForm.value.recurrenceTime);
      this.ScheduleDaily.startDate = this.FixDateTime(this.dailyScheduleForm.value.startDate);
      this.ScheduleDaily.dateEnd = this.FixDateTime(this.dailyScheduleForm.value.endDate);

      this.scheduleDailyService.put(this.ScheduleDaily).subscribe(data => {
        this.dailyScheduleForm.reset();

        const model = {
          id: data.id,
          type: 'Daily',
          dateNextDue: data.dateNextDue,
          startDate: data.startDate,
        };

        this.ref.close(model);
      });
    }
  }

  private SubmitWeekly() {
    if (this.isWeekly) {
      if (this.weeklyScheduleForm.invalid) {
        return;
      }

      this.ScheduleWeekly = this.weeklyScheduleForm.value;

      if (this.Id) {
        this.ScheduleWeekly.id = this.Id;
      }
      this.ScheduleWeekly.assetId = this.AssetId;
      this.ScheduleWeekly.plannedMaintenanceId = this.PlannedMaintenanceId;
      this.ScheduleWeekly.recurrenceTime = this.GetRecurranceTime(this.weeklyScheduleForm.value.recurrenceTime);
      this.ScheduleWeekly.startDate = this.FixDateTime(this.weeklyScheduleForm.value.startDate);
      this.ScheduleWeekly.dateEnd = this.FixDateTime(this.weeklyScheduleForm.value.endDate);

      this.scheduleWeeklyService.put(this.ScheduleWeekly).subscribe(data => {
        this.weeklyScheduleForm.reset();
        const model = {
          id: data.id,
          type: 'Weekly',
          dateNextDue: data.dateNextDue,
          startDate: data.startDate,
        };

        this.ref.close(model);
      });
    }
  }

  private SubmitMonthly() {
    if (this.isMonthly) {
      if (this.monthlyScheduleForm.invalid) {
        return;
      }
      this.ScheduleMonthly = this.monthlyScheduleForm.value;

      if (this.Id) {
        this.ScheduleMonthly.id = this.Id;
      }
      this.ScheduleMonthly.assetId = this.AssetId;
      this.ScheduleMonthly.plannedMaintenanceId = this.PlannedMaintenanceId;
      this.ScheduleMonthly.recurrenceTime = this.GetRecurranceTime(this.monthlyScheduleForm.value.recurrenceTime);
      this.ScheduleMonthly.startDate = this.FixDateTime(this.monthlyScheduleForm.value.startDate);
      this.ScheduleMonthly.dateEnd = this.FixDateTime(this.monthlyScheduleForm.value.endDate);

      this.scheduleMonthlyService.put(this.ScheduleMonthly).subscribe(data => {
        this.monthlyScheduleForm.reset();
        const model = {
          id: data.id,
          type: 'Monthly',
          dateNextDue: data.dateNextDue,
          startDate: data.startDate,
        };

        this.ref.close(model);
      });
    }
  }

  private SubmitYearly() {
    if (this.isYearly) {
      if (this.yearlyScheduleForm.invalid) {
        return;
      }
      this.ScheduleYearly = this.yearlyScheduleForm.value;

      if (this.Id) {
        this.ScheduleYearly.id = this.Id;
      }
      this.ScheduleYearly.assetId = this.AssetId;
      this.ScheduleYearly.plannedMaintenanceId = this.PlannedMaintenanceId;
      this.ScheduleYearly.recurrenceTime = this.GetRecurranceTime(this.yearlyScheduleForm.value.recurrenceTime);
      this.ScheduleYearly.startDate = this.FixDateTime(this.yearlyScheduleForm.value.startDate);
      this.ScheduleYearly.dateEnd = this.FixDateTime(this.yearlyScheduleForm.value.endDate);

      this.scheduleYearlyService.put(this.ScheduleYearly).subscribe(data => {
        this.yearlyScheduleForm.reset();
        const model = {
          id: data.id,
          type: 'Yearly',
          dateNextDue: data.dateNextDue,
          startDate: data.startDate,
        };

        this.ref.close(model);
      });
    }
  }

  private GetRecurranceTime(hours: number) {

    return new Date(Date.UTC(0, 0, 0, hours, 0, 0, 0));
  }

  private FixDateTime(date: Date) {

    if (date) {
      return new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()));
    }
  }

  private GenerateDisplayDateTimeValues(type: string, num: number) {
    let ext = '';
    let val;
    for (let i = 1; i <= num; i++) {
      ext = 'th';

      val = i % 10;

      if (val === 1) {
        ext = 'st';
      }
      if (val === 2) {
        ext = 'nd';
      }
      if (val === 3) {
        ext = 'rd';
      }

      if (val === 0) {
        if (i < 3) {
          ext = 'th';
        }
      }

      if (i === 11 || i === 12 || i === 13) {
        ext = 'th';
      }

      switch (type) {

        case 'hours': {
          this.repeatHours.push({ 'val': i, 'ext': 'H' });
        }
          break;
        case 'days': {
          this.repeatDays.push({ 'val': i, 'ext': ext });
        }
          break;
        case 'months': {
          this.repeatMonths.push({ 'val': i, 'ext': ext });
        }
          break;
        case 'years': {
          this.repeatYears.push({ 'val': i, 'ext': ext });
        }
      }
    }
  }
}
