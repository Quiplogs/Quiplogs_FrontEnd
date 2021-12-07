import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PlannedMaintenanceTask } from '../../../models/plannedMaintenanceTask';
import { DialogDeleteComponent } from '../../../../@shared/components/dialog-delete/dialog-delete.component';

import {
  PlannedMaintenanceTaskService,
} from '../../../services';
import { ToastrAlertService } from '../../../../@core/utils';

@Component({
  selector: 'ngx-planned-maintenance-detail-task',
  templateUrl: 'planned-maintenance-detail-task.component.html',
  styleUrls: ['planned-maintenance-detail-task.component.scss'],
})
export class PlannedMaintenanceDetailTaskComponent implements OnInit {
  @Input()
  plannedMaintenanceId: any;

  public plannedMaintenanceTasks: any = [];

  constructor(
    private dialogService: NbDialogService,
    private dataService: PlannedMaintenanceTaskService,
  ) { }

  ngOnInit() {
    if (this.plannedMaintenanceId) {
      this.dataService.getList(this.plannedMaintenanceId).subscribe(data => {
        if (data && data.length > 0) {

          data.forEach(element => {
            element.canEdit = false;
          });
          this.plannedMaintenanceTasks = data;
        }
      });
    }
  }

  addItem() {
    const model = new PlannedMaintenanceTask();
    model.canEdit = true;
    this.plannedMaintenanceTasks.push(model);
  }

  editItemClick(index: number) {
    const model = this.plannedMaintenanceTasks[index];
    model.canEdit = true;
  }

  saveItemClick(index: number) {
    const model = this.plannedMaintenanceTasks[index];

    // model.quantityRequired = Number((<HTMLInputElement>document.getElementById('inputTaskQuantity' + index)).value);
    model.description = (<HTMLInputElement>document.getElementById('inputTaskDescription' + index)).value;
    model.plannedMaintenanceId = this.plannedMaintenanceId;

    if (model) {
      this.dataService.put(model).subscribe(data => {

        this.plannedMaintenanceTasks[index] = model;
        model.canEdit = false;
      });
    }
  }

  deleteItemClick(index: number) {

    const objectToDelete = this.plannedMaintenanceTasks[index];

    if (objectToDelete) {
      this.dialogService.open(DialogDeleteComponent, {
        context: {
          type: 'Planned Maintenance Task',
          name: objectToDelete.part.code,
          id: objectToDelete.id,
        },
      }).onClose.subscribe(id => {
        if (id) {
          this.dataService.delete(id).subscribe(data => {
            if (data) {
              this.plannedMaintenanceTasks.splice(index);
            }
          });
        }
      });
    }
  }
}
