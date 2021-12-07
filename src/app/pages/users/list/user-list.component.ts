import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../../@core/services/user.service';
import { ToastrAlertService } from '../../../@core/utils/toastr.service';
import { DialogDeleteComponent } from '../../../@shared/components/dialog-delete/dialog-delete.component';
import { PagedList } from '../../../@core/models/paged-list';
import { User } from '../../../@core/models/user';

@Component({
  selector: 'ngx-user-list',
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {
  public pagedList;
  public IsLoaded: boolean = false;
  private page: string;
  private filterName: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: UserService,
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

    this.dataService.getPagedList(this.page, this.filterName)
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
        type: 'User',
        name: item.name,
        id: item.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.dataService.delete(id).subscribe(data => {
          this.loadPage();
        });
      }
    });
  }
}
