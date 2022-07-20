import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Part } from '../../../@invetnory-core/models/part';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartService } from '../../../@invetnory-core/services/part.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DialogDeleteComponent } from '../../../@shared/components';

@Component({
    selector: 'ngx-part-create',
    styleUrls: ['./part-create.component.scss'],
    templateUrl: './part-create.component.html',
})

export class PartCreateComponent implements OnInit {
    @Input()
    PartId: any;

    public partId: string;
    public isLoaded: boolean = false;
    public locationList: any = null;
    private partForm: FormGroup;
    private part: Part = null;
    public submitted: boolean = false;

    private imageFileName: string;
    private imageMimeType: string;
    private ImageBase64: string;

    constructor(
        private ngxService: NgxUiLoaderService,
        private formBuilder: FormBuilder,
        private partService: PartService,
        private route: ActivatedRoute,
        private dialogService: NbDialogService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.ngxService.startLoader('ldr-part-create');

        this.partId = this.route.snapshot.params['id'];

        this.loadModel();

        this.partForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: [''],
            description: [''],
        });
    }

    get formControls() { return this.partForm.controls; }

    stopLoader() {
        this.ngxService.stopLoader('ldr-part-create');
        this.isLoaded = true;
    }

    onSubmit() {
        this.submitted = true;

        if (this.partForm.invalid) {
            return;
        }

        this.part = this.partForm.value;

        if (this.partId) {
            this.part.id = this.partId;
        }

        // Set Image variables
        this.part.imageFileName = this.imageFileName;
        this.part.imageMimeType = this.imageMimeType;
        this.part.ImageBase64 = this.ImageBase64;

        this.partService.put(this.part).subscribe(data => {
            if (data) {
                this.router.navigate(['/parts/edit/' + data.id]);
            }
        });
    }

    loadModel() {

        if (this.partId) {

            this.partService.get(this.partId).subscribe(data => {
                this.part = data;
                this.partForm.patchValue(data);
                this.stopLoader();
            });
        } else {
            this.part = new Part();
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

    delete() {
        this.dialogService.open(DialogDeleteComponent, {
            context: {
                type: 'Part',
                name: this.part.code,
                id: this.part.id,
            },
        }).onClose.subscribe(id => {
            if (id) {
                this.partService.delete(id).subscribe(data => {
                    this.router.navigate(['/parts/list']);
                });
            }
        });
    }
}
