import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkOrderPart, WorkOrderPartAdapter } from '../../models/workOrderPart';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsService } from '../../../@core/services/api-endpoint.service';
import { QueryStringParameters } from '../../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class WorkOrderPartService {

    private apiType: string = 'workorderpart';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: WorkOrderPartAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public getList(parentId: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            parentId: parentId,
        };

        return this.http.post(this.apiEndpointService.apiUrl(this.apiType + '/ListByParent'), JSON.stringify(model), { headers }).pipe(
            map((data: any) => {
                return data;
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public put(model: WorkOrderPart): Observable<WorkOrderPart> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const modelToPut = {
            model: model,
        };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(modelToPut), { headers }).pipe(
            map((data: any) => {
                return this.adapter.adapt(data);
            }),
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
            map((data: any) => {
                this.apiMessageHandlerService.handleSuccess('Succesfully deleted Work Order Part');
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }
}
