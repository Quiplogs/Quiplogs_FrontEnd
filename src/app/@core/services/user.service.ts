import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndpointsService } from './api-endpoint.service';
import { catchError, map } from 'rxjs/operators';
import { User, UserAdapter } from '../models/user';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { PagedList } from '../models/paged-list';
import { ApiMessageHandlerService } from './api-message-handler.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    user = { name: 'Quiplogs User' };

    private apiType: string = 'user';

    constructor(
        private http: HttpClient,
        private apiEndpointService: ApiEndpointsService,
        private adapter: UserAdapter,
        private apiMessageHandlerService: ApiMessageHandlerService,
    ) { }

    getLoggedInUserName(): Observable<any> {

        return of(this.user);
    }

    getUsers(): Observable<User[]> {

        return this.http.get(this.apiEndpointService.apiUrl(this.apiType + '/list')).pipe(
            map((data: any[]) => data.map(item => this.adapter.adapt(item))),
        );
    }

    public getPagedList(pageNumber: string, filterName: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            pageSize: 20,
            pageNumber: pageNumber,
            filterParameters: {
                'Email': filterName,
            },
        };

        return this.http.post(this.apiEndpointService.apiUrl(this.apiType + '/PagedList'), JSON.stringify(model), { headers }).pipe(
            map((data: PagedList<User>) => {
                return new PagedList<User>(data.pager, data.pagedItems);
            }),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(model);
            }));
    }

    public put(model: User): Observable<User> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const putModel = {
            Model: model,
        };

        return this.http.put(this.apiEndpointService.apiUrl(this.apiType + '/'), JSON.stringify(putModel), { headers }).pipe(
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully updated User')),
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
            map((data: any) => this.adapter.adapt(data), this.apiMessageHandlerService.handleSuccess('Succesfully deleted User')),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }),
        );
    }

    public get(id: string): Observable<User> {

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

    public getTechnicians() {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        const model = {
            locationId: null,
        };

        return this.http.post(this.apiEndpointService.apiUrl('user/technicianlist'), JSON.stringify(model), { headers }).pipe(
            map((data: any[]) => data.map(item => this.adapter.adapt(item))),
            catchError(err => {
                this.apiMessageHandlerService.handleError(err);
                return of(null);
            }));
    }
}
