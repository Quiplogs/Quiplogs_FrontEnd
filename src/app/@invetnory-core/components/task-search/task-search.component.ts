import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { PagedList } from '../../../@core/models/paged-list';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrAlertService } from '../../../@core/utils';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'ngx-task-search',
    styleUrls: ['task-search.component.scss'],
    templateUrl: 'task-search.component.html',
})

export class TaskSearchComponent implements OnInit {
    private pagedList: PagedList<Task>;
    private page: string;
    private filterName: string = '';
    private loaderName: string = 'ldr-part-list';
    public timeoutHandler;
    public IsLoaded: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private dataService: TaskService,
        private ngxService: NgxUiLoaderService,
        private toastrAlertService: ToastrAlertService,
        protected ref: NbDialogRef<TaskSearchComponent>,
        private deviceService: DeviceDetectorService,
    ) { }

    ngOnInit() {
        this.ngxService.startLoader(this.loaderName);
        this.route.queryParams.subscribe(x => {
            this.page = x.page || 1;
            this.loadPage(this.page);
        });
    }

    private loadPage(page: string) {
        if (page !== 'undefined') {
            this.page = page;
        }
        this.dataService.getList(this.page, this.filterName)
            .subscribe(data => {
                this.pagedList = data;

                this.ngxService.stopLoader(this.loaderName);
                setTimeout(() => {
                    this.IsLoaded = true;
                }, 1000);
            },
                error => {
                    this.toastrAlertService.showErrorToast(error);
                });
    }

    linkModel(index: number) {
        const model = this.pagedList.pagedItems[index];
        // Mobile deivce is to long press to save and normal user will just click to save
        if (this.deviceService.isMobile()) {
            this.timeoutHandler = setTimeout(() => {
                this.uploadSelection(model);
                this.timeoutHandler = null;
            }, 500);
        } else {
            this.uploadSelection(model);
        }
    }

    filterByName($event) {
        this.filterName = $event;
        this.loadPage(this.page);
    }

    uploadSelection(model: any) {
        this.ref.close(model);
    }

    cancel() {
        this.ref.close();
    }
}
