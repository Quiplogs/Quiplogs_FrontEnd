import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ToastrAlertService } from '../../../../@core/utils/toastr.service';
import { DialogDeleteComponent } from '../../../../@shared/components/dialog-delete/dialog-delete.component';
import { PagedList } from '../../../../@core/models/paged-list';
import { WorkOrder } from '../../../../@workorder-core/models/workOrder';
import { WorkOrderService } from '../../../../@workorder-core/services';

@Component({
  selector: 'ngx-workorder-list-inprogress',
  styleUrls: ['./workorder-list-inprogress.component.scss'],
  templateUrl: './workorder-list-inprogress.component.html',
})

export class WorkOrderListInProgressComponent implements OnInit {
  public pagedList: PagedList<WorkOrder>;
  public IsLoaded: boolean = false;
  private page: string;
  private filterName: string = '';

  constructor(
    private route: ActivatedRoute,
    private workOrderService: WorkOrderService,
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

    const dictionary = {
      'status': '1',
      'referenceNumber': this.filterName,
    };

    this.workOrderService.getList(this.page, dictionary)
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
        type: 'Work Order',
        name: item.name,
        id: item.id,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.workOrderService.delete(id).subscribe(data => {
          this.loadPage();
        });
      }
    });
  }
}
