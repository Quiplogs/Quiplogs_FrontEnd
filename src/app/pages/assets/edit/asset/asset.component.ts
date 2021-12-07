import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../../../@asset-core/models/asset';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../../../../@asset-core/services/asset.service';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../../../@core/services/location.service';
import { DashboardService } from '../../../../@dashboard/services/dashboard.service';

@Component({
    selector: 'ngx-asset',
    templateUrl: './asset.component.html',
    styleUrls: ['./asset.component.scss'],
})

export class AssetEditComponent implements OnInit {
    @Input()
    AssetId: any;

    public assetId: string;
    public isLoaded: boolean = false;
    public locationList: any = null;
    private assetForm: FormGroup;
    private asset: Asset = null;
    public assetLocationId: string;
    public assetUom: string;
    public submitted: boolean = false;
    public totalWOOpen = 0;
    public totalWOInProgress = 0;
    public totalWOCompleted = 0;

    private imageFileName: string;
    private imageMimeType: string;
    private ImageBase64: string;

    public showAsset: boolean = true;
    public showPM: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private assetService: AssetService,
        private route: ActivatedRoute,
        private locationService: LocationService,
        private dashboardService: DashboardService,
    ) { }

    ngOnInit() {
        this.assetId = this.route.snapshot.params['id'];

        this.loadModel();

        if (this.assetId) {
            this.dashboardService.get('AssetWorkOrders', '', this.assetId).subscribe(data => {
                this.totalWOOpen = data[0].TotalWorkOrdersOpen;
                this.totalWOInProgress = data[0].TotalWorkOrdersInProgress;
                this.totalWOCompleted = data[0].TotalWorkOrdersCompleted;
            });
        }

        this.locationService.getList().subscribe(data => {
            this.locationList = data;
            this.stopLoader();
        });

        this.assetForm = this.formBuilder.group({
            name: ['', Validators.required],
            make: [''],
            model: [''],
            serialNumber: [''],
            purchasedDate: [''],
            manufacturedDate: [''],
            currentWorkDone: [''],
            uom: ['', Validators.required],
            locationId: ['', Validators.required],
        });
    }

    get formControls() { return this.assetForm.controls; }

    stopLoader() {
        this.isLoaded = true;
    }

    onSubmit() {
        this.submitted = true;

        if (this.assetForm.invalid) {
            return;
        }

        this.asset = this.assetForm.value;

        if (this.assetId) {
            this.asset.id = this.assetId;
        }

        // Set Image variables
        this.asset.imageFileName = this.imageFileName;
        this.asset.imageMimeType = this.imageMimeType;
        this.asset.ImageBase64 = this.ImageBase64;

        this.assetService.put(this.asset).subscribe(data => {
            this.asset = data;
        });
    }

    loadModel() {

        if (this.assetId) {

            this.assetService.get(this.assetId).subscribe(data => {
                this.asset = data;
                this.assetForm.patchValue(this.asset);
                this.assetLocationId = data.locationId;
                this.assetUom = data.uoM;

                this.stopLoader();
            });
        } else {

            this.asset = new Asset();
            this.stopLoader();
        }
    }

    imageUploaded(event: any) {

        this.imageFileName = event.fileName;
        this.imageMimeType = event.fileType;
        this.ImageBase64 = event.fileBase64;
    }

    imageRemoved(event: any) {

        this.loadModel();
    }

    openAsset() {
        this.showAsset = true;
        this.showPM = false;
    }

    openPM() {
        this.showAsset = false;
        this.showPM = true;
    }
}
