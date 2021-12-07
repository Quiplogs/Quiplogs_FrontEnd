import { Injectable } from '@angular/core';
import { UrlBuilder } from '../../@shared/models/url-builder';
import { QueryStringParameters } from '../../@shared/models/query-string-parameters';
import { AppSettings } from '../data/constants';

@Injectable({
    providedIn: 'root',
})
export class ApiEndpointsService {

    constructor(
    ) { }

    // URL
    // private createUrl(
    //    action: string,
    //    isMockAPI: boolean = false,
    // ): string {
    //    const urlBuilder: UrlBuilder = new UrlBuilder(AppSettings.API_ENDPOINT, action);
    //    return urlBuilder.toString();
    // }

    // URL WITH QUERY PARAMS
    public createUrlWithQueryParameters(
        action: string,
        queryStringHandler?:
            (queryStringParameters: QueryStringParameters) => void,
    ): string {
        const urlBuilder: UrlBuilder = new UrlBuilder(
            AppSettings.API_ENDPOINT,
            action,
        );
        // Push extra query string params
        if (queryStringHandler) {
            queryStringHandler(urlBuilder.queryString);
        }
        return urlBuilder.toString();
    }

    public apiUrl(action: string): string {
        return AppSettings.API_ENDPOINT + '/' + action;
    }

    // URL WITH PATH VARIABLES
    // private createUrlWithPathVariables(
    //     action: string,
    //     pathVariables: any[] = [],
    // ): string {
    //     let encodedPathVariablesUrl: string = '';
    //     // Push extra path variables
    //     for (const pathVariable of pathVariables) {
    //         if (pathVariable !== null) {
    //             encodedPathVariablesUrl +=
    //                 `/${encodeURIComponent(pathVariable.toString())}`;
    //         }
    //     }
    //     const urlBuilder: UrlBuilder = new UrlBuilder(
    //         AppSettings.API_ENDPOINT,
    //         `${action}${encodedPathVariablesUrl}`,
    //     );
    //     return urlBuilder.toString();
    // }
}
