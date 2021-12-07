import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Part, PartAdapter } from '../models/part';
import { PagedList } from '../../@core/models/paged-list';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsService } from '../../@core/services/api-endpoint.service';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class PartService {

    private apiType: string = 'part';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: PartAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public getPagedList(pageNumber: string, filterName: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            pageSize: 20,
            pageNumber: pageNumber,
            filterParameters: {
                'Code': filterName,
            },
        };

        return this.http.post(this.apiEndpointService.apiUrl(this.apiType + '/PagedList'), JSON.stringify(model), { headers }).pipe(
            map((data: PagedList<Part>) => {
                return new PagedList<Part>(data.pager, data.pagedItems);
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

        return this.http.post(this.apiEndpointService.apiUrl(this.apiType + '/List'), JSON.stringify(model), { headers }).pipe(
            map((data: any[]) => data.map(item => this.adapter.adapt(item))),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public put(modelEntity: Part): Observable<Part> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            Model: modelEntity,
        };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(model), { headers }).pipe(
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully updated Part')),
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
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully deleted Part')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public get(id: string): Observable<Part> {

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
            }));
    }
}
