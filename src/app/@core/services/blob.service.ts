import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpointsService } from './api-endpoint.service';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BlobEntity, BlobEntityAdapter } from '../models/blob';
import { ApiMessageHandlerService } from './api-message-handler.service';

@Injectable({
    providedIn: 'root',
})
export class BlobService {

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private apiMessageHandlerService: ApiMessageHandlerService,
        private adapter: BlobEntityAdapter,
    ) { }

    public delete(foreignKey: string, applicationType: string) {
        const url = this.apiEndpointService.createUrlWithQueryParameters(
            'blob',
            (qs: QueryStringParameters) => {
                qs.push('foreignKey', foreignKey);
                qs.push('applicationType', applicationType);
            },
        );

        return this.http.delete(url).pipe(
            map((data: any) => {
                this.apiMessageHandlerService.handleSuccess('Succesfully deleted Blob');
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public get(foreignKey: string, applicationType: string): Observable<BlobEntity> {

        const url = this.apiEndpointService.createUrlWithQueryParameters(
            'blob',
            (qs: QueryStringParameters) => {
                qs.push('foreignKey', foreignKey);
                qs.push('applicationType', applicationType);
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
