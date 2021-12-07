import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ApiEndpointsService } from '../../@core/services/api-endpoint.service';
import { ScheduleCustom, ScheduleCustomAdapter } from '../models/schedule-custom';
import { map, catchError } from 'rxjs/operators';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class ScheduleCustomService {

    private apiType: string = 'ScheduleCustom';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private customAdapter: ScheduleCustomAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public getList(plannedMaintenanceId: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            ParentId: plannedMaintenanceId,
        };

        return this.http.post(this.apiEndpointService.apiUrl(this.apiType + '/ListByParent'), JSON.stringify(model), { headers }).pipe(
            map((data: any) => data),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public get(id: string): Observable<ScheduleCustom> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType,
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.get(url, { headers }).pipe(
            map((data: any) => this.customAdapter.adapt(data)),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public delete(id: string, showToast: boolean) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType,
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.delete(url, { headers }).pipe(
            map((data: any) => {
                if (showToast) {
                    this.apiMessageHandlerService.handleSuccess('Succesfully deleted Custom Schedule');
                }
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public put(modelEntity: ScheduleCustom): Observable<ScheduleCustom> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            Model: modelEntity,
        };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(model), { headers }).pipe(
            map((data: any) => this.customAdapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully updated Custom Schedule')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }
}
