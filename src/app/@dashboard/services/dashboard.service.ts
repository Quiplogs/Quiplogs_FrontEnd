import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEndpointsService } from '../../@core/services/api-endpoint.service';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {

    private apiType: string = 'dashboardmain';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public get(queryName: string, locationId: string, assetId: string): Observable<any> {

        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType,
            (qs: QueryStringParameters) => {
                qs.push('locationId', locationId),
                qs.push('assetId', assetId),
                qs.push('queryName', queryName);
            },
        );

        return this.http.get(url).pipe(
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }
}
