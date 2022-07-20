import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PlannedMaintenance } from '../../../models/plannedMaintenance';
import { DialogDeleteComponent } from '../../../../@shared/components/dialog-delete/dialog-delete.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlannedMaintenanceService } from '../../../services/plannedMaintenance/planned-maintenance.service';
import { UserService } from '../../../../@core/services';

@Component({
  selector: 'ngx-planned-maintenance-detail',
  templateUrl: 'planned-maintenance-detail.component.html',
  styleUrls: ['planned-maintenance-detail.component.scss'],
})
export class PlannedMaintenanceDetailComponent implements OnInit {
  @Input()
  model: PlannedMaintenance;
  @Input()
  index: string;

  public editMode: boolean = true;
  public detailForm: FormGroup;
  public technicianList: any = null;

  constructor(
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private dataService: PlannedMaintenanceService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.detailForm = this.formBuilder.group({
      name: [this.model.name, Validators.required],
      technicianId: [this.model.defaultTechnicianId, Validators.required],
    });

    this.enabledControls();

    this.userService.getTechnicians().subscribe(data => {
      this.technicianList = data;
    });
  }

  updateItemClick() {
    if (this.detailForm.dirty) {
      this.model.name = this.detailForm.value.name;
      this.model.defaultTechnicianId = this.detailForm.value.technicianId;

      this.dataService.put(this.model).subscribe(data => {
        this.model = data;
      });
    }
    this.enabledControls();
  }

  editItemClick() {
    this.enabledControls();
  }

  deleteItemClick() {

    this.dialogService.open(DialogDeleteComponent, {
      context: {
        type: 'Planned Maintenance',
        name: this.model.name,
        id: this.model.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        // this.ngxService.startLoader('ldr-location-list');
        // this.locationService.delete(id).subscribe(data => {
        //   this.loadPage();
        // });
      }
    });
  }

  openProductPopup() {

  }

  private enabledControls() {
    if (this.editMode) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }

    if (!this.editMode) {
      this.detailForm.controls.name.disable();
      this.detailForm.controls.technicianId.disable();
    } else {
      this.detailForm.controls.name.enable();
      this.detailForm.controls.technicianId.enable();
    }
  }
}
