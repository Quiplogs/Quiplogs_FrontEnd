import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { AssetSearchComponent } from '../../../@asset-core/components';
import { Asset } from '../../../@asset-core/models/asset';
import { LocationService, UserService } from '../../../@core/services';
import { DialogDeleteComponent } from '../../../@shared/components';
import { WorkOrder } from '../../../@workorder-core/models/workOrder';
import { WorkOrderService } from '../../../@workorder-core/services';

@Component({
  selector: 'ngx-workorder-edit',
  styleUrls: ['./workorder-edit.component.scss'],
  templateUrl: './workorder-edit.component.html',
})

export class WorkOrderEditComponent implements OnInit {

  public editMode: boolean = true;
  public editDetailsMode: boolean = false;
  public model: WorkOrder;
  public locationList;
  public technicianList;
  public submitted: boolean = false;
  public workOrderForm: FormGroup;
  public workOrderDetailForm: FormGroup;

  public modelId: any;
  public isPlanned: boolean;
  public selectedPriority;
  public priorityList: any;

  constructor(
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private dataService: WorkOrderService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.modelId = this.route.snapshot.params['id'];
    this.loadModel();

    this.locationService.getList().subscribe(data => {
      this.locationList = data;
    });

    this.userService.getTechnicians().subscribe(data => {
      this.technicianList = data;
    });

    this.workOrderForm = this.formBuilder.group({
      priority: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      assetName: [''],
      assetId: [''],
      locationId: ['', Validators.required],
      technicianId: ['', Validators.required],
    });

    this.workOrderDetailForm = this.formBuilder.group({
      hoursWorked: ['', Validators.required],
      minutesWorked: ['', Validators.required],
      notes: ['', Validators.required],
    });

    this.enabledControls();
  }

  get formControls() { return this.workOrderForm.controls; }

  updateWorkOrderClick() {

    this.submitted = true;

    if (this.workOrderForm.invalid) {
      return;
    }
    if (this.workOrderForm.dirty) {

      this.model = this.workOrderForm.value;
      this.model.isPlanned = this.isPlanned;
      this.model.id = this.modelId;

      this.dataService.put(this.model).subscribe(data => {
        this.reloadCurrentRoute();
      });

    }
    this.enabledControls();
  }

  editWorkOrderClick() {
    this.enabledControls();
  }

  updateCancelClick() {
    this.enabledControls();
  }

  startWorkOrderClick() {
    if (this.model) {
      // Set status to In Progress
      this.model.status = 1;
      this.model.isPlanned = this.isPlanned;
      this.model.id = this.modelId;

      this.dataService.put(this.model).subscribe(data => {
        this.reloadCurrentRoute();
      });
    }
  }

  pauseWorkOrderClick() {
    if (this.model) {
      // Set status to On Hold
      this.model.status = 2;
      this.model.isPlanned = this.isPlanned;
      this.model.id = this.modelId;

      this.dataService.put(this.model).subscribe(data => {
        this.reloadCurrentRoute();
      });
    }
  }

  completeWorkOrderClick() {
    if (this.model) {
      // Set to Complete
      this.model.status = 3;

      this.model.hoursWorked = Number((<HTMLInputElement>document.getElementById('hoursWorked')).value);
      this.model.minutesWorked = Number((<HTMLInputElement>document.getElementById('minutesWorked')).value);
      this.model.notes = (<HTMLInputElement>document.getElementById('notes')).value;
      this.model.dateCompleted = new Date(Date.now());
      this.model.isPlanned = this.isPlanned;
      this.model.id = this.modelId;

      this.dataService.put(this.model).subscribe(data => {
        this.reloadCurrentRoute();
      });
    }
  }

  deleteWorkOrderClick() {
    this.dialogService.open(DialogDeleteComponent, {
      context: {
        type: 'Work Order',
        name: this.model.referenceNumber,
        id: this.model.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.dataService.delete(id).subscribe(data => {
          this.router.navigate(['/workorders/create']);
        });
      }
    });
  }

  loadModel() {
    if (this.modelId) {
      this.dataService.get(this.modelId).subscribe(data => {
        this.model = data;
        this.isPlanned = this.model.isPlanned;
        this.workOrderForm.patchValue(data);

        this.buildPriorityList();
      });
    }
  }

  private enabledControls() {
    if (this.editMode) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }

    if (!this.editMode) {
      this.workOrderForm.controls.referenceNumber.disable();
      this.workOrderForm.controls.assetName.disable();
      this.workOrderForm.controls.locationId.disable();
      this.workOrderForm.controls.technicianId.disable();
    } else {
      this.workOrderForm.controls.referenceNumber.enable();
      this.workOrderForm.controls.assetName.enable();
      this.workOrderForm.controls.locationId.enable();
      this.workOrderForm.controls.technicianId.enable();
    }
  }

  private enableChildControls() {
    if (this.editDetailsMode) {
      this.editDetailsMode = false;
    } else {
      this.editDetailsMode = true;
    }
  }

  openAssetSearchDialog() {

    this.dialogService.open(AssetSearchComponent).onClose.subscribe(asset => {
      if (asset) {
        this.workOrderForm.patchValue({
          assetId: asset.id,
        });
        this.model.asset = new Asset();
        this.model.asset.name = asset.name;
      }
    });
  }

  buildPriorityList() {
    this.priorityList = [{
      value: 0,
      name: 'Low',
    }, {
      value: 1,
      name: 'Medium',
    }, {
      value: 2,
      name: 'High',
    }];
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
