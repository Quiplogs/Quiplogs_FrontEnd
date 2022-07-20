import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from '../../../@core/models/user';
import { LocationService, UserService } from '../../../@core/services';
import { ToastrAlertService } from '../../../@core/utils';
import { DialogDeleteComponent } from '../../../@shared/components';

@Component({
    selector: 'ngx-user-edit',
    styleUrls: ['./user-edit.component.scss'],
    templateUrl: './user-edit.component.html',
})

export class UserEditComponent implements OnInit {
    public modelId: string = null;
    public isLoaded: boolean = false;
    private modelForm: FormGroup;
    private model: User = null;
    public locationList: any = null;
    public submitted: boolean = false;

    constructor(
        private ngxService: NgxUiLoaderService,
        private formBuilder: FormBuilder,
        private modelService: UserService,
        private route: ActivatedRoute,
        private locationService: LocationService,
        private toastrAlertService: ToastrAlertService,
        private dialogService: NbDialogService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.ngxService.startLoader('ldr-model-edit');

        this.modelId = this.route.snapshot.params['id'];

        this.loadModel();

        this.locationService.getList().subscribe(data => {
            this.locationList = data;
            this.stopLoader();
        });

        this.modelForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            role: ['', Validators.required],
            locationId: [''],
            password: [''],
            currentPassword: [''],
            reenteredPassword: [''],
        });
    }

    get formControls() { return this.modelForm.controls; }

    stopLoader() {
        this.ngxService.stopLoader('ldr-model-edit');
        this.isLoaded = true;
    }

    onSubmit() {
        this.submitted = true;

        if (this.modelForm.invalid) {
            return;
        }

        this.model = this.modelForm.value;

        if (this.modelId) {
            this.model.id = this.modelId;
        }

        if (this.confirmPassword()) {
            this.modelService.put(this.model).subscribe(data => {
                if (this.modelId) {
                    this.model = data;
                    this.modelForm.patchValue(data);
                } else {
                    this.router.navigate(['/users/create']);
                }
            });
        }
    }

    confirmPassword() {
        if (this.model.password !== this.model.reenteredPassword) {
            this.toastrAlertService.showErrorToast('Passwords dont match');
            return false;
        } else {
            return true;
        }
    }

    loadModel() {

        if (this.modelId) {

            this.modelService.get(this.modelId).subscribe(data => {
                this.model = data;
                this.modelForm.patchValue(data);
                this.stopLoader();
            });
        } else {
            this.stopLoader();
        }
    }

    delete() {
        this.dialogService.open(DialogDeleteComponent, {
            context: {
                type: 'User',
                name: this.model.email,
                id: this.model.id,
            },
        }).onClose.subscribe(id => {
            if (id) {
                this.modelService.delete(id).subscribe(data => {
                    this.router.navigate(['/users/list']);
                });
            }
        });
    }
}
