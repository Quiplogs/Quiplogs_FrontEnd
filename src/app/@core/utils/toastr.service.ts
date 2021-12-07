import { Injectable } from '@angular/core';
import 'style-loader!angular2-toaster/toaster.css';
import {
    NbComponentStatus,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
} from '@nebular/theme';

@Injectable({
    providedIn: 'root',
})
export class ToastrAlertService {

    index = 1;
    private destroyByClick = true;
    private duration = 2000;
    private hasIcon = true;
    private position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    private preventDuplicates = false;

    constructor(private toastrService: NbToastrService) { }

    public showErrorToast(body: string) {
        const type: NbComponentStatus = 'danger';
        this.duration = 10000;
        this.showToast(type, 'Error', JSON.stringify(body));
    }

    public showErrorShortToast(body: string) {
        const type: NbComponentStatus = 'danger';
        this.duration = 3000;
        this.showToast(type, 'Error', JSON.stringify(body));
    }

    public showSuccessToast(body: string) {
        const type: NbComponentStatus = 'success';
        this.duration = 3000;
        this.showToast(type, 'Success', body);
    }

    private showToast(type: NbComponentStatus, title: string, body: string) {
        const titleContent = title ? `${title}` : '';
        const config = {
            status: type,
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
        };

        this.index += 1;
        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}
