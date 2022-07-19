import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LocationEntity } from '../../../@core/models/location';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../../@core/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DialogDeleteComponent } from '../../../@shared/components';

@Component({
  selector: 'ngx-location-create',
  styleUrls: ['./location-create.component.scss'],
  templateUrl: './location-create.component.html',
})

export class LocationCreateComponent implements OnInit {
  @Input()
  LocationId: any;

  public locationId: string;
  public isLoaded: boolean = false;
  public locationForm: UntypedFormGroup;
  public location: LocationEntity = null;
  public userList: any = null;
  public submitted: boolean = false;

  private imageFileName: string;
  private imageMimeType: string;
  private ImageBase64: string;

  constructor(
    private ngxService: NgxUiLoaderService,
    private formBuilder: UntypedFormBuilder,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ngxService.startLoader('loader-01');
    this.locationId = this.route.snapshot.params['id'];

    this.loadLocation();

    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: [''],
      long: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      userId: [''],
    });
  }

  get formControls() { return this.locationForm.controls; }

  stopLoader() {
    this.ngxService.stopLoader('loader-01');
    this.isLoaded = true;
  }

  onSubmit() {
    this.submitted = true;

    if (this.locationForm.invalid) {
      return;
    }

    this.location = this.locationForm.value;

    if (this.locationId) {
      this.location.id = this.locationId;
    }

    // Set Image variables
    this.location.imageFileName = this.imageFileName;
    this.location.imageMimeType = this.imageMimeType;
    this.location.ImageBase64 = this.ImageBase64;

    this.locationService.put(this.location).subscribe(data => {
      if (data) {
        this.router.navigate(['/locations/edit/' + data.id]);
      }
    });
  }

  loadLocation() {

    if (this.locationId) {

      this.locationService.get(this.locationId).subscribe(data => {
        this.location = data;
        this.locationForm.patchValue(data);
        this.stopLoader();
      });
    } else {
      this.location = new LocationEntity();
    }
  }

  onUserSelectionChanged(event: any) {
    this.location.userId = event;
  }

  imageUploaded(event: any) {

    this.imageFileName = event.fileName;
    this.imageMimeType = event.fileType;
    this.ImageBase64 = event.fileBase64;
  }

  imageRemoved(event: any) {

    this.loadLocation();
  }

  delete() {
    this.dialogService.open(DialogDeleteComponent, {
      context: {
        type: 'Location',
        name: this.location.name,
        id: this.location.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.locationService.delete(id).subscribe(data => {
          this.router.navigate(['/location/list']);
        });
      }
    });
  }
}
