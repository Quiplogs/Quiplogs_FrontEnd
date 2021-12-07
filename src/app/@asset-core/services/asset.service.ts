import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset, AssetAdapter } from '../models/asset';
import { PagedList } from '../../@core/models/paged-list';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsService } from '../../@core/services/api-endpoint.service';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class AssetService {

    private apiType: string = 'asset';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: AssetAdapter,
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

        return this.http.post(this.apiEndpointService.apiUrl(this.apiType + '/PagedList'), JSON.stringify(model), { headers }).pipe(
            map((data: PagedList<Asset>) => {
                return new PagedList<Asset>(data.pager, data.pagedItems);
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public put(model: Asset): Observable<Asset> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const assetModel = {
            Model: model,
        };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(assetModel), { headers }).pipe(
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully updated Asset')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public delete(id: string) {
        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType,
            (qs: QueryStringParameters) => {
                qs.push('id', id);
            },
        );

        return this.http.delete(url).pipe(
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully deleted Asset')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public get(id: string): Observable<Asset> {

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
