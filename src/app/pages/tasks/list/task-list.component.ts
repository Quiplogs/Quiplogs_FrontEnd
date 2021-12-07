import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { TaskService } from '../../../@invetnory-core/services/task.service';
import { ToastrAlertService } from '../../../@core/utils/toastr.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogDeleteComponent } from '../../../@shared/components/dialog-delete/dialog-delete.component';
import { DialogTaskAddComponent } from '../../../@invetnory-core/components/dialog-task-add/dialog-task-add.component';

@Component({
    selector: 'ngx-task-list',
    styleUrls: ['./task-list.component.scss'],
    templateUrl: './task-list.component.html',
})

export class TaskListComponent implements OnInit {
    public pager = {};
    public pageOfItems = [];
    public isLoaded: boolean = false;
    private page: string;
    private filterName: string = '';

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        private ngxService: NgxUiLoaderService,
        private toastrAlertService: ToastrAlertService,
        private dialogService: NbDialogService,
        public router: Router,
    ) { }

    ngOnInit() {
        this.ngxService.startLoader('ldr-task-list');
        this.route.queryParams.subscribe(x => {
            this.page = x.page || 1;
            this.loadPage();
        });
    }

    edit($event, item) {
        this.dialogService.open(DialogTaskAddComponent, {
            context: {
                id: item.id,
            },
        }).onClose.subscribe(id => {
            if (id) {
                this.loadPage();
            }
        });
    }

    private loadPage() {

        this.taskService.getList(this.page, this.filterName)
            .subscribe(data => {
                this.pager = data.pager;
                this.pageOfItems = data.pagedItems;

                this.ngxService.stopLoader('ldr-task-list');
                setTimeout(() => {
                    this.isLoaded = true;
                }, 1000);
            },
                error => {
                    this.toastrAlertService.showErrorToast(error);
                });
    }

    filterByName($event) {
        this.filterName = $event;
        this.loadPage();
    }

    delete(event, item) {
        this.dialogService.open(DialogDeleteComponent, {
            context: {
                type: 'Task',
                name: item.code,
                id: item.id,
            },
        }).onClose.subscribe(id => {
            if (id) {
                this.ngxService.startLoader('ldr-task-list');
                this.taskService.delete(id).subscribe(data => {
                    this.loadPage();
                });
            }
        });
    }
}
