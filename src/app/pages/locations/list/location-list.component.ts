import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocationService } from '../../../@core/services/location.service';
import { ToastrAlertService } from '../../../@core/utils/toastr.service';
import { DialogDeleteComponent } from '../../../@shared/components/dialog-delete/dialog-delete.component';
import { PagedList } from '../../../@core/models/paged-list';
import { LocationEntity } from '../../../@core/models/location';

@Component({
  selector: 'ngx-location-list',
  styleUrls: ['./location-list.component.scss'],
  templateUrl: './location-list.component.html',
})

export class LocationListComponent implements OnInit {
  public pagedList: PagedList<LocationEntity>;
  public IsLoaded: boolean = false;
  private page: string;
  private filterName: string = '';

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private toastrAlertService: ToastrAlertService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
      this.page = x.page || 1;
      this.loadPage();
    });
  }

  private loadPage() {

    this.locationService.getPagedList(this.page, this.filterName)
      .subscribe(data => {
        this.pagedList = data;
        this.IsLoaded = true;
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
        type: 'Location',
        name: item.name,
        id: item.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.locationService.delete(id).subscribe(data => {
          this.loadPage();
        });
      }
    });
  }
}
