import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationEntity, LocationAdapter } from '../models/location';
import { PagedList } from '../models/paged-list';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsService } from './api-endpoint.service';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from './api-message-handler.service';

@Injectable({
    providedIn: 'root',
})
export class LocationService {

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: LocationAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public getPagedList(pageNumber: string, filterName: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            pageSize: 20,
            pageNumber: pageNumber,
            filterParameters: {
                'Name': filterName,
            },
        };

        return this.http.post(this.apiEndpointService.apiUrl('Location/PagedList'), JSON.stringify(model), { headers }).pipe(
            map((data: PagedList<LocationEntity>) => {
                return new PagedList<LocationEntity>(data.pager, data.pagedItems);
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public getList() {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {};

        return this.http.post(this.apiEndpointService.apiUrl('Location/List'), JSON.stringify(model), { headers }).pipe(
            map((data: any[]) => data.map(item => this.adapter.adapt(item))),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public put(model: LocationEntity): Observable<LocationEntity> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const putModel = {
            Model: model,
        };

        return this.http.put(this.apiEndpointService.apiUrl('location/'), JSON.stringify(putModel), { headers }).pipe(
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully updated Location')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public delete(id: string) {
        const url = this.apiEndpointService.createUrlWithQueryParameters(
            'location',
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.delete(url).pipe(
            map((data: any) => {
                this.apiMessageHandlerService.handleSuccess('Succesfully deleted Location');
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public get(id: string): Observable<LocationEntity> {

        const url = this.apiEndpointService.createUrlWithQueryParameters(
            'location',
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.get(url).pipe(
            map((data: any) => this.adapter.adapt(data)),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }
}
