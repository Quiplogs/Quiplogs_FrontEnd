import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PartService } from '../../services/part.service';
import { Part } from '../../models/part';
import { PagedList } from '../../../@core/models/paged-list';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrAlertService } from '../../../@core/utils';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'ngx-part-search',
    styleUrls: ['part-search.component.scss'],
    templateUrl: 'part-search.component.html',
})

export class PartSearchComponent implements OnInit {
    private pagedList: PagedList<Part>;
    public IsLoaded: boolean = false;
    private page: string;
    private filterName: string = '';
    private loaderName: string = 'ldr-part-list';
    public timeoutHandler;

    constructor(
        private route: ActivatedRoute,
        private dataService: PartService,
        private ngxService: NgxUiLoaderService,
        private toastrAlertService: ToastrAlertService,
        protected ref: NbDialogRef<PartSearchComponent>,
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
        this.dataService.getPagedList(this.page, this.filterName)
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
