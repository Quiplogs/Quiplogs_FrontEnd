import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DialogDeleteComponent } from '../../../../@shared/components';
import { WorkOrderTask } from '../../../../@workorder-core/models/workOrderTask';
import { WorkOrderTaskService } from '../../../../@workorder-core/services';

@Component({
    selector: 'ngx-workorder-task',
    templateUrl: 'workorder-task.component.html',
    styleUrls: ['workorder-task.component.scss'],
  })
  export class WorkOrderTaskComponent implements OnInit {
    @Input()
    editMode: boolean = true;
    @Input()
    workOrderTasks: any = [];
    @Input()
    workOrderId: string;

    constructor(
      private dialogService: NbDialogService,
      private dataService: WorkOrderTaskService,
    ) { }

    ngOnInit() {}

    addItem() {
      const model = new WorkOrderTask();
      model.workOrderId = this.workOrderId;
      this.workOrderTasks.push(model);
    }

    saveItemClick(index: number) {
      const model = this.workOrderTasks[index];

      model.description = (<HTMLInputElement>document.getElementById('inputTaskDescription' + index)).value;

      if (model) {
        this.dataService.put(model).subscribe(data => {

          this.workOrderTasks[index] = model;
        });
      }
    }

    completedClick($event, index: number) {
      const model = this.workOrderTasks[index];
      model.isCompleted = $event;
      if (model) {
        this.dataService.put(model).subscribe(data => {
          this.workOrderTasks[index] = model;
        });
      }
    }

    deleteItemClick(index: number) {

      const objectToDelete = this.workOrderTasks[index];

      if (objectToDelete) {
        this.dialogService.open(DialogDeleteComponent, {
          context: {
            type: 'Work Order Task',
            name: objectToDelete.description.substring(0, 10),
            id: objectToDelete.id,
          },
        }).onClose.subscribe(id => {
          if (id) {
            this.dataService.delete(id).subscribe(data => {
              if (data) {
                this.workOrderTasks.splice(index);
              }
            });
          }
        });
      }
    }
  }
