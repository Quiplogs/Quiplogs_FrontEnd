import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PlannedMaintenanceInitialComponent } from '../planned-maintenance-initial/planned-maintenance-initial.component';
import { PlannedMaintenanceService } from '../../../services/plannedMaintenance/planned-maintenance.service';
import { LocalStorageService } from '../../../../@core/services/local-storage.service';
import { PagedList } from '../../../../@core/models/paged-list';
import { PlannedMaintenance } from '../../../models/plannedMaintenance';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ngx-planned-maintenance-accordion',
    templateUrl: './planned-maintenance-accordion.component.html',
    styleUrls: ['./planned-maintenance-accordion.component.scss'],
})

export class PlannedMaintenanceAccordionComponent implements OnInit {
    @Input()
    set AssetId(assetId: string) {
        if (assetId) {
            this.isEnabled = true;
            this.assetId = assetId;
        }
    }

    @Input()
    set AssetLocationId(assetLocaionId: string) {
        if (assetLocaionId) {
            this.assetLocationId = assetLocaionId;
        }
    }

    @Input()
    set AssetUoM(assetUom: number) {
        if (assetUom) {
            this.assetUom = assetUom;
        }
    }

    private pagerLink: string;
    public pagedList: PagedList<PlannedMaintenance>;
    private pmpage: string;
    private filterName: string = '';
    public IsLoaded: boolean = false;
    private plannedMaintenanceList: any = [];
    private mobile: boolean = false;
    private assetId: string;
    private assetLocationId: string;
    private assetUom: number;
    lblAdd: string;
    isEnabled: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private dialogService: NbDialogService,
        private plannedMaintenanceService: PlannedMaintenanceService,
        private localStorageService: LocalStorageService,
    ) { }

    ngOnInit() {
        if (window.screen.width === 360) { // 768px portrait
            this.mobile = true;
        }

        this.setLabels();

        this.route.queryParams.subscribe(x => {
            this.pmpage = x.page || 1;
            this.initalizeLists();
          });
    }

    initalizeLists() {

        this.plannedMaintenanceService.getPagedList(this.assetId, this.pmpage, this.filterName).subscribe(data => {
            this.pagedList = data;
            this.plannedMaintenanceList = data.pagedItems;
            this.setExpandedListItem(this.assetId);
            this.IsLoaded = true;
        });
    }

    setExpandedListItem(id: string) {

        const localId = id === '' ? this.localStorageService.getAssetCreateStepperCurrentPlannedMaintenance() : id;

        // Set expanded item
        this.plannedMaintenanceList.map((obj) => {

            if (obj.id === localId) {
                obj.expanded = true;
            }
            return obj;
        });
    }

    setLabels() {
        if (this.mobile) {
            this.lblAdd = 'Add PM';
        } else {
            this.lblAdd = 'Add Planned Maintenance';
        }
    }

    addPlannedMaintenance() {

        this.dialogService.open(PlannedMaintenanceInitialComponent, {
            hasScroll: true,
            context: {
                AssetId: this.assetId,
                AssetLocationId: this.assetLocationId,
            },
        }).onClose.subscribe(
            model => {
                if (model) {
                    this.plannedMaintenanceList.push(model);

                    // Add planned maintenance and update which step they are at incase browser gets refreshed
                    this.localStorageService.updateAssetCreateStepper(this.AssetId, model.id, false);

                    this.setExpandedListItem(model.id);
                }
            });
    }

    updateLabel(event: any, index: any) {
        const updateItem = this.plannedMaintenanceList[index];
        updateItem.name = event;
        this.plannedMaintenanceList.items[index] = updateItem;
    }
}
