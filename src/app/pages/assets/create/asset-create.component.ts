import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Asset } from '../../../@asset-core/models/asset';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../../../@asset-core/services/asset.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LocationService } from '../../../@core/services/location.service';
import { LocalStorageService } from '../../../@core/services/local-storage.service';

@Component({
    selector: 'ngx-asset-create',
    templateUrl: './asset-create.component.html',
    styleUrls: ['./asset-create.component.scss'],
})

export class AssetCreateComponent implements OnInit, OnDestroy {

    public assetId: string;
    public isLoaded: boolean = false;
    public submitted: boolean = false;
    public locationList: any = null;
    public isPMSelected: boolean;
    public shouldSubmit: boolean = false;
    private asset: Asset = null;
    private assetForm: FormGroup;
    private loader: string = 'ldr-asset-create';
    private mySubscription: any;
    public assetLocationId: string;
    public assetUom: string;

    constructor(
        private ngxService: NgxUiLoaderService,
        private formBuilder: FormBuilder,
        private assetService: AssetService,
        public route: ActivatedRoute,
        private locationService: LocationService,
        public localStorageService: LocalStorageService,
        private router: Router,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    ngOnInit() {
        this.startLoader();

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
            isRecurring: [''],
        });

        this.assetForm.controls.uom.setValue('1');
        this.assetForm.controls.isRecurring.setValue(false);
    }

    get f() { return this.assetForm.controls; }

    startLoader() {
        this.ngxService.startLoader(this.loader);
        this.isLoaded = false;
    }

    stopLoader() {
        this.ngxService.stopLoader(this.loader);
        this.isLoaded = true;
    }

    onSubmit() {
        if (!this.assetId) {
            this.putAsset();
        } else {
            this.router.navigate(['/assets/create']);
        }
    }

    onSubmitNext() {
        this.putAsset();
    }

    private putAsset() {
        this.submitted = true;

        if (this.assetForm.invalid) {
            return;
        }

        this.startLoader();
        this.asset = this.assetForm.value;

        this.assetService.put(this.asset).subscribe(data => {
            this.asset = data;

            this.assetLocationId = data.locationId;
            this.assetUom = data.uoM;

            if (!this.assetId) {
                this.assetId = data.id;
                this.shouldSubmit = true;
            }
            this.router.navigate(['/assets/edit/' + data.id]);
            this.stopLoader();
        });
    }

    loadModel() {

        if (this.assetId) {

            this.assetService.get(this.assetId).subscribe(data => {
                this.asset = data;
                this.assetForm.patchValue(data);
                this.stopLoader();
            });
        } else {
            this.stopLoader();
        }
    }

    imageUploaded(event: any) {

        this.asset = this.assetForm.value;

        this.asset.imageFileName = event.fileName;
        this.asset.imageMimeType = event.fileType;
        this.asset.ImageBase64 = event.fileBase64;
    }

    imageRemoved(event: any) {

        this.loadModel();
    }

    updateRecurring(checked: boolean) {
        this.isPMSelected = checked;
    }

    ngOnDestroy(): void {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }
}
