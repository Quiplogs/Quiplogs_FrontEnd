import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ApiEndpointsService } from '../../@core/services/api-endpoint.service';
import { ScheduleYearly, ScheduleYearlyAdapter } from '../models/schedule-yearly';
import { catchError, map } from 'rxjs/operators';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class ScheduleYearlyService {

    private apiType: string = 'ScheduleYearly';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private scheduleYearlyAdapter: ScheduleYearlyAdapter,
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

    public get(id: string): Observable<ScheduleYearly> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType,
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.get(url, { headers }).pipe(
            map((data: any) => this.scheduleYearlyAdapter.adapt(data)),
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
                    this.apiMessageHandlerService.handleSuccess('Succesfully deleted Yearly Schedule');
                }
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public put(modelEntity: ScheduleYearly): Observable<ScheduleYearly> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            Model: modelEntity,
        };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType), JSON.stringify(model), { headers }).pipe(
            map((data: any) => this.scheduleYearlyAdapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully updated Yearly Schedule')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }
}
