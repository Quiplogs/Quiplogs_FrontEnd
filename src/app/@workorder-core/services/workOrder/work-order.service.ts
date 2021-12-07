import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkOrder, WorkOrderAdapter } from '../../models/workOrder';
import { PagedList } from '../../../@core/models/paged-list';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsService } from '../../../@core/services/api-endpoint.service';
import { QueryStringParameters } from '../../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class WorkOrderService {

    private apiType: string = 'workorder';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: WorkOrderAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public getList(pageNumber: string, filters: any) {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            pageSize: 20,
            pageNumber: pageNumber,
            filterParameters: filters,
        };

        return this.http.post(this.apiEndpointService.apiUrl('WorkOrder/PagedList'), JSON.stringify(model), { headers }).pipe(
            map((data: PagedList<WorkOrder>) => {
                return new PagedList<WorkOrder>(data.pager, data.pagedItems);
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public put(model: WorkOrder): Observable<WorkOrder> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const modelToPut = {
            model: model,
        };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(modelToPut), { headers }).pipe(
            map((data: any) => this.adapter.adapt(data),
                this.apiMessageHandlerService.handleSuccess('Succesfully updated Work Order')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public delete(id: string) {
        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType,
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.delete(url).pipe(
            map((data: any) => this.adapter.adapt(data),
                this.apiMessageHandlerService.handleSuccess('Succesfully deleted Work Order Part')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public get(id: string): Observable<WorkOrder> {

        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType,
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.get(url).pipe(
            map((data: any) => this.adapter.adapt(data)),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }
}
