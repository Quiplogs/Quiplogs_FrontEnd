import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlannedMaintenance } from '../../../models/plannedMaintenance';
import { PlannedMaintenanceService } from '../../../services/plannedMaintenance/planned-maintenance.service';
import { UserService } from '../../../../@core/services/user.service';
import { Asset } from '../../../../@asset-core/models/asset';

@Component({
  selector: 'ngx-planned-maintenance-initial',
  templateUrl: 'planned-maintenance-initial.component.html',
  styleUrls: ['planned-maintenance-initial.component.scss'],
})
export class PlannedMaintenanceInitialComponent implements OnInit {
  @Input()
  AssetId: string;
  @Input()
  AssetLocationId: string;

  public createForm: FormGroup;
  public scheduleForm: FormGroup;
  public miscForm: FormGroup;
  public plannedMaintenance: PlannedMaintenance;
  public technicianList: any = null;

  public plannedMaintenancePersisted: boolean = false;

  constructor(
    protected ref: NbDialogRef<PlannedMaintenanceInitialComponent>,
    private formBuilder: FormBuilder,
    private dataService: PlannedMaintenanceService,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.plannedMaintenance = new PlannedMaintenance();
    this.plannedMaintenance.asset = new Asset();

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      defaultTechnicianId: ['', Validators.required],
    });

    this.scheduleForm = this.formBuilder.group({});
    this.miscForm = this.formBuilder.group({});

    this.userService.getTechnicians().subscribe(data => {
      this.technicianList = data;
    });
  }

  get f() { return this.createForm.controls; }

  cancel() {
    this.ref.close();
  }

  closeStepper() {
    this.ref.close(this.plannedMaintenance);
  }

  onCreatePlannedMaintenance() {

    if (this.createForm.invalid) {
      return;
    }

    this.plannedMaintenance = this.createForm.value;
    this.plannedMaintenance.assetId = this.AssetId;
    this.plannedMaintenance.locationId = this.AssetLocationId;

    this.dataService.put(this.plannedMaintenance).subscribe(data => {
      this.plannedMaintenance = data;
      this.createForm.markAsDirty();
      this.plannedMaintenancePersisted = true;
    });
  }

  onCreateSchedule() {
    this.scheduleForm.markAsDirty();
  }

  onCreateMisc() {
    this.miscForm.markAsDirty();
  }
}
