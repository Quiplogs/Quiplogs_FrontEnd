import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrAlertService } from '../../../../@core/utils';
import { PartSearchComponent } from '../../../../@invetnory-core/components';
import { Part } from '../../../../@invetnory-core/models/part';
import { DialogDeleteComponent } from '../../../../@shared/components';
import { WorkOrderPart } from '../../../../@workorder-core/models/workOrderPart';
import { WorkOrderPartService } from '../../../../@workorder-core/services';

@Component({
  selector: 'ngx-workorder-part',
  templateUrl: 'workorder-part.component.html',
  styleUrls: ['workorder-part.component.scss'],
})
export class WorkOrderPartComponent implements OnInit {
  @Input()
  editMode: boolean = true;
  @Input()
  workOrderParts: any = [];
  @Input()
  workOrderId: string;

  constructor(
    private dialogService: NbDialogService,
    private dataService: WorkOrderPartService,
    private toastrAlertService: ToastrAlertService,
  ) { }

  ngOnInit() {
  }

  addItem() {
    const model = new WorkOrderPart();
    model.partId = null;
    model.workOrderId = this.workOrderId;
    if (!this.checkIfNullExists(model.partId)) {
      this.workOrderParts.push(model);
    }
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
            this.toastrAlertService.showErrorShortToast('Part: ' + part.code + ' already exists in current Planned Maintenance.');
          }
        }
      });
    }
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

  checkIfNullExists(id: string): boolean {
    for (let i = 0; i <= this.workOrderParts.length; i++) {
      const element = this.workOrderParts[i];
      if (element !== undefined && element.partId === id) {
        return true;
      }
    }

    return false;
  }

  saveItemClick(index: number) {
    const model = this.workOrderParts[index];

    const qty = (<HTMLInputElement>document.getElementById('inputPartQuantityRequired' + index)).value;
    model.quantityRequired = qty;

    if (model) {
      this.dataService.put(model).subscribe(data => {
        this.workOrderParts[index] = data;
        model.canEdit = false;
      });
    }
  }

  completedClick($event, index: number) {
    const model = this.workOrderParts[index];

    const qty = (<HTMLInputElement>document.getElementById('inputPartquantityUsed' + index)).value;
    model.quantityUsed = qty;
    model.isCompleted = $event;

    if (model.id) {
      this.dataService.put(model).subscribe(data => {
        this.workOrderParts[index] = data;
      });
    }
  }

  deleteItemClick(index: number) {

    const objectToDelete = this.workOrderParts[index];

    if (objectToDelete) {
      this.dialogService.open(DialogDeleteComponent, {
        context: {
          type: 'Work Order Part',
          name: objectToDelete.part.name,
          id: objectToDelete.id,
        },
      }).onClose.subscribe(id => {
        if (id) {
          this.dataService.delete(id).subscribe(data => {
            if (data) {
              this.workOrderParts.splice(index, 1);
            }
          });
        }
      });
    }
  }
}
