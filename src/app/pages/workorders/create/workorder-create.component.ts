import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Asset } from '../../../@asset-core/models/asset';
import { LocationService, UserService } from '../../../@core/services';
import { WorkOrder } from '../../../@workorder-core/models/workOrder';
import { WorkOrderService } from '../../../@workorder-core/services';
import { AssetSearchComponent } from '../../../@asset-core/components';
import { WorkOrderPart } from '../../../@workorder-core/models/workOrderPart';
import { WorkOrderTask } from '../../../@workorder-core/models/workOrderTask';
import { ToastrAlertService } from '../../../@core/utils';
import { DialogDeleteComponent } from '../../../@shared/components';
import { PartSearchComponent } from '../../../@invetnory-core/components';

@Component({
    selector: 'ngx-workorder-create',
    styleUrls: ['./workorder-create.component.scss'],
    templateUrl: './workorder-create.component.html',
})

export class WorkOrderCreateComponent implements OnInit {

    public locationList;
    public technicianList;
    public workOrderCreateForm: UntypedFormGroup;
    public modelId: any;
    public submitted: boolean = false;
    public model: WorkOrder;
    public workOrderParts: any = [];
    public workOrderTasks: any = [];

    constructor(
        private dialogService: NbDialogService,
        private formBuilder: UntypedFormBuilder,
        private dataService: WorkOrderService,
        private router: Router,
        private locationService: LocationService,
        private userService: UserService,
        private toastrAlertService: ToastrAlertService,
    ) { }

    ngOnInit() {
        this.workOrderCreateForm = this.formBuilder.group({
            priority: ['', Validators.required],
            referenceNumber: ['', Validators.required],
            assetId: ['', Validators.required],
            locationId: ['', Validators.required],
            technicianId: ['', Validators.required],
        });

        this.locationService.getList().subscribe(data => {
            this.locationList = data;
        });

        this.userService.getTechnicians().subscribe(data => {
            this.technicianList = data;
        });

        this.model = new WorkOrder();
        this.workOrderParts.push(new WorkOrderPart());
        this.workOrderTasks.push(new WorkOrderTask());
    }

    submitWorkOrder() {
        this.submitted = true;

        if (this.validateLineItems()) {
            return;
        }

        if (this.workOrderCreateForm.invalid) {
            return;
        }

        if (this.workOrderCreateForm.dirty) {

            this.model = this.workOrderCreateForm.value;
            this.model.isPlanned = true;
            this.model.workOrderParts = this.workOrderParts;
            this.model.workOrderTasks = this.workOrderTasks;

            this.dataService.put(this.model).subscribe(data => {
                this.router.navigate(['/workorders/edit/' + data.id]);
            });
        }
    }

    private validateLineItems() {
        let hasErrors = false;
        if (this.workOrderParts.length < 1 && this.workOrderTasks.length < 1) {
            this.toastrAlertService.showErrorToast('At least 1 Part / Task is required');
            hasErrors = true;
        }

        let partsErrorCount = 0;
        this.workOrderParts.forEach(element => {
            if (!element.partId) {
                partsErrorCount++;
            }
        });

        let tasksErrorCount = 0;
        this.workOrderTasks.forEach(element => {
            if (!element.description) {
                tasksErrorCount++;
            }
        });

        if (partsErrorCount > 0) {
            this.toastrAlertService.showErrorToast('One or more Parts are empty');
            hasErrors = true;
        }

        if (tasksErrorCount > 0) {
            this.toastrAlertService.showErrorToast('One or more Tasks are empty');
            hasErrors = true;
        }

        return hasErrors;
    }

    openAssetSearchDialog() {

        this.dialogService.open(AssetSearchComponent).onClose.subscribe(asset => {
            if (asset) {
                this.workOrderCreateForm.patchValue({
                    assetId: asset.id,
                });
                this.model.asset = new Asset();
                this.model.asset.name = asset.name;
            }
        });
    }

    openProductPopup(index: number) {
        const model = this.workOrderParts[index];
        if (model) {

            this.dialogService.open(PartSearchComponent).onClose.subscribe(part => {
                if (part) {
                    if (!this.checkIfExists(part.code)) {
                        model.part = part;
                        model.partId = part.id;
                        model.quantityRequired = 1;

                        this.workOrderParts[index] = model;
                    } else {
                        this.toastrAlertService.showErrorShortToast('Part: ' +
                            part.code + ' already exists in current Planned Maintenance.');
                    }
                }
            });
        }
    }

    deletePartClick(index: number) {

        const objectToDelete = this.workOrderParts[index];

        if (objectToDelete.id) {
            this.dialogService.open(DialogDeleteComponent, {
                context: {
                    type: 'Work Order Part',
                    name: objectToDelete.part.name,
                    id: objectToDelete.id,
                },
            }).onClose.subscribe(id => {
                this.workOrderParts.splice(index, 1);
            });
        } else {
            this.workOrderParts.splice(index, 1);
        }
    }

    deleteTaskClick(index: number) {

        const objectToDelete = this.workOrderTasks[index];

        if (objectToDelete.description) {
            this.dialogService.open(DialogDeleteComponent, {
                context: {
                    type: 'Work Order Task',
                    name: objectToDelete.description.substring(0, 10),
                    id: objectToDelete.id,
                },
            }).onClose.subscribe(id => {
                this.workOrderTasks.splice(index);
            });
        } else {
            this.workOrderTasks.splice(index);
        }
    }

    addPartLine() {
        this.workOrderParts.push(new WorkOrderPart());
    }

    addTaskLine() {
        this.workOrderTasks.push(new WorkOrderTask());
    }

    checkIfExists(id: string): boolean {
        for (let i = 0; i <= this.workOrderParts.length; i++) {
            const element = this.workOrderParts[i];
            if (element !== undefined && element.part !== undefined && element.part.id === id) {
                return true;
            }
        }

        return false;
    }
}
