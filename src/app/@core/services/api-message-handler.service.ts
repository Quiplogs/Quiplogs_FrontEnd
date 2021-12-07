import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ToastrAlertService } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ApiMessageHandlerService {

    constructor(private toastrAlertService: ToastrAlertService) { }

    handleSuccess(message) {
        this.toastrAlertService.showSuccessToast(message);
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.description}`;
        } else {
            // server-side error
            if (typeof error.error === 'string') {
                errorMessage = `Message: ${error.error}`;
            } else {
                if (error.error[0]) {
                    errorMessage = `Error Code: ${error.error[0].code}
                                    Message: ${error.error[0].description}`;
                }
                if (error.title) {
                    errorMessage = `Error: ${error.errors[0].title}`;
                }
            }
        }
        this.toastrAlertService.showErrorToast(errorMessage);
        return throwError(errorMessage);
    }
}
