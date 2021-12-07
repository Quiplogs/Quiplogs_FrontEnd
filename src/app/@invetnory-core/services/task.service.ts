import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, TaskAdapter } from '../models/task';
import { PagedList } from '../../@core/models/paged-list';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpointsService } from '../../@core/services/api-endpoint.service';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { ApiMessageHandlerService } from '../../@core/services';

@Injectable({
    providedIn: 'root',
})
export class TaskService {

    private apiType: string = 'task';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: TaskAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    public getList(pageNumber: string, filterName: string) {
        const url = this.apiEndpointService.createUrlWithQueryParameters(
            this.apiType + '/list',
            (qs: QueryStringParameters) => {
                qs.push('pageNumber', pageNumber);
                qs.push('filterName', filterName);
            },
        );

        return this.http.get<PagedList<Task>>(url).pipe(
            map((data: any) => {
                return new PagedList<Task>(data.pager, data.pagedItems.map(item => this.adapter.adapt(item)));
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public put(model: Task): Observable<Task> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(model), { headers }).pipe(
            map((data: any) => this.adapter.adapt(data)),
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
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }

    public get(id: string): Observable<Task> {

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
