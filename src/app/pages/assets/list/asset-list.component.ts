import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { AssetService } from '../../../@asset-core/services/asset.service';
import { ToastrAlertService } from '../../../@core/utils/toastr.service';
import { DialogDeleteComponent } from '../../../@shared/components/dialog-delete/dialog-delete.component';
import { PagedList } from '../../../@core/models/paged-list';
import { Asset } from '../../../@asset-core/models/asset';

@Component({
  selector: 'ngx-asset-list',
  styleUrls: ['./asset-list.component.scss'],
  templateUrl: './asset-list.component.html',
})

export class AssetListComponent implements OnInit {
  public pagedList: PagedList<Asset>;
  public IsLoaded: boolean = false;
  private page: string;
  private filterName: string = '';

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
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

    this.assetService.getPagedList(this.page, this.filterName)
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
        type: 'Asset',
        name: item.name,
        id: item.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.assetService.delete(id).subscribe(data => {
          this.loadPage();
        });
      }
    });
  }
}
