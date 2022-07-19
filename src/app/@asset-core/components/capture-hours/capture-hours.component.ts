import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AssetUsage } from '../../models/asset-usage';
import { AssetUsageService } from '../../services/asset-usage.service';

@Component({
    selector: 'ngx-capture-hours',
    templateUrl: 'capture-hours.component.html',
    styleUrls: ['capture-hours.component.scss'],
})
export class CaptureHoursComponent implements OnInit {
    @Input()
    AssetId;

    @Input()
    uom;

    private assetUsage: AssetUsage = null;
    public submitted: boolean = false;
    private captureWorkForm: UntypedFormGroup;
    private loader: string = 'ldr-assetusage-add';
    public isLoaded = true;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private assetUsageService: AssetUsageService,
        private ngxService: NgxUiLoaderService,
    ) { }

    ngOnInit() {

        this.captureWorkForm = this.formBuilder.group({
            workDone: ['', Validators.required],
            dateCaptured: [new Date(), Validators.required],
        });
    }

    get f() { return this.captureWorkForm.controls; }

    startLoader() {
        this.ngxService.startLoader(this.loader);
        this.isLoaded = false;
    }

    stopLoader() {
        this.ngxService.stopLoader(this.loader);
        this.isLoaded = true;
    }

    onSubmit() {
        if (this.captureWorkForm.invalid) {
            return;
        }

        this.assetUsage = this.captureWorkForm.value;
        this.assetUsage.assetId = this.AssetId;
        this.assetUsageService.put(this.assetUsage).subscribe(data => {
            this.captureWorkForm.reset();
            this.stopLoader();
        });
    }
}
