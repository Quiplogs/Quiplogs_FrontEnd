import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlannedMaintenance, PlannedMaintenanceAdapter } from '../../models/plannedMaintenance';
import { PagedList } from '../../../@core/models/paged-list';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsService } from '../../../@core/services/api-endpoint.service';
import { QueryStringParameters } from '../../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class PlannedMaintenanceService {

    private apiType: string = 'plannedmaintenance';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: PlannedMaintenanceAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public getPagedList(assetId: string, pageNumber: string, filterName: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            parentId: assetId,
            pageSize: 10,
            pageNumber: pageNumber,
        };

        return this.http.post(this.apiEndpointService.apiUrl(this.apiType + '/PagedList'), JSON.stringify(model), { headers }).pipe(
            map((data: PagedList<PlannedMaintenance>) => {
                return new PagedList<PlannedMaintenance>(data.pager, data.pagedItems);
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public put(model: PlannedMaintenance): Observable<PlannedMaintenance> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

            const pmModel = {
                Model: model,
            };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(pmModel), { headers }).pipe(
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully updated Planned Maintenance')),
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
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully deleted Planned Maintenance')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public get(id: string): Observable<PlannedMaintenance> {

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
