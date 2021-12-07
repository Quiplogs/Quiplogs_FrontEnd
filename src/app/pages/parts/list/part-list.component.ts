import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { PartService } from '../../../@invetnory-core/services/part.service';
import { ToastrAlertService } from '../../../@core/utils/toastr.service';
import { DialogDeleteComponent } from '../../../@shared/components/dialog-delete/dialog-delete.component';
import { PagedList } from '../../../@core/models/paged-list';
import { Part } from '../../../@invetnory-core/models/part';

@Component({
  selector: 'ngx-part-list',
  styleUrls: ['./part-list.component.scss'],
  templateUrl: './part-list.component.html',
})

export class PartListComponent implements OnInit {
  public pagedList: PagedList<Part>;
  public IsLoaded: boolean = false;
  private page: string;
  private filterName: string = '';

  constructor(
    private route: ActivatedRoute,
    private partService: PartService,
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

    this.partService.getPagedList(this.page, this.filterName)
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
        type: 'Part',
        name: item.name,
        id: item.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.partService.delete(id).subscribe(data => {
          this.loadPage();
        });
      }
    });
  }
}
