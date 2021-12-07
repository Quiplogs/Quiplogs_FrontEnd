import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PlannedMaintenancePart } from '../../../models/plannedMaintenancePart';
import { DialogDeleteComponent } from '../../../../@shared/components/dialog-delete/dialog-delete.component';

import {
  PlannedMaintenancePartService,
} from '../../../services';
import { PartSearchComponent } from '../../../../@invetnory-core/components/part-search/part-search.component';
import { Part } from '../../../../@invetnory-core/models/part';
import { ToastrAlertService } from '../../../../@core/utils';

@Component({
  selector: 'ngx-planned-maintenance-detail-part',
  templateUrl: 'planned-maintenance-detail-part.component.html',
  styleUrls: ['planned-maintenance-detail-part.component.scss'],
})
export class PlannedMaintenanceDetailPartComponent implements OnInit {
  @Input()
  plannedMaintenanceId: any;

  public plannedMaintenanceParts: any = [];

  constructor(
    private dialogService: NbDialogService,
    private dataService: PlannedMaintenancePartService,
    private toastrAlertService: ToastrAlertService,
  ) { }

  ngOnInit() {
    if (this.plannedMaintenanceId) {
      this.dataService.getList(this.plannedMaintenanceId).subscribe(data => {
        if (data && data.length > 0) {

          data.forEach(element => {
            element.canEdit = false;
          });
          this.plannedMaintenanceParts = data;
        }
      });
    }
  }

  addItem() {
    const model = new PlannedMaintenancePart();
    model.canEdit = true;
    this.plannedMaintenanceParts.push(model);
  }

  openProductPopup(index: number) {
    const model = this.plannedMaintenanceParts[index];
    if (model) {

      this.dialogService.open(PartSearchComponent).onClose.subscribe(part => {
        if (part) {
          if (!this.checkIfExists(part.code)) {
            model.plannedMaintenanceId = this.plannedMaintenanceId;
            model.partId = part.id;
            model.part = new Part();
            model.part.code = part.code;
            model.quantity = 1;

            this.plannedMaintenanceParts[index] = model;
          } else {
            this.toastrAlertService.showErrorShortToast('Part: ' + part.code + ' already exists in current Planned Maintenance.');
          }
        }
      });
    }
  }

  checkIfExists(code: string): boolean {
    for (let i = 0; i <= this.plannedMaintenanceParts.length; i++) {
      const element = this.plannedMaintenanceParts[i];
      if (element !== undefined && element.part !== undefined && element.part.code === code) {
        return true;
      }
    }

    return false;
  }

  editItemClick(index: number) {
    const model = this.plannedMaintenanceParts[index];
    model.canEdit = true;
  }

  saveItemClick(index: number) {
    const model = this.plannedMaintenanceParts[index];

    const qty = (<HTMLInputElement>document.getElementById('inputPartQuantity' + index)).value;
    model.quantity = qty;

    if (model) {
      this.dataService.put(model).subscribe(data => {

        this.plannedMaintenanceParts[index] = model;
        model.canEdit = false;
      });
    }
  }

  deleteItemClick(index: number) {

    const objectToDelete = this.plannedMaintenanceParts[index];

    if (objectToDelete) {
      this.dialogService.open(DialogDeleteComponent, {
        context: {
          type: 'Planned Maintenance Part',
          name: objectToDelete.part.name,
          id: objectToDelete.id,
        },
      }).onClose.subscribe(id => {
        if (id) {
          this.dataService.delete(id).subscribe(data => {
            if (data) {
              this.plannedMaintenanceParts.splice(index, 1);
            }
          });
        }
      });
    }
  }
}
