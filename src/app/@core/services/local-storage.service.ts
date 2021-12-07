import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    private stepperAssetIdStorageName = 'StepperAssetId';
    private stepperPlannedMaintenanceIdStorageName = 'StepperPlannedMaintenanceId';

    constructor() { }

    updateAssetCreateStepper(assetId: string, plannedMaintenanceId: string, isCompleted: boolean) {

        if (isCompleted) {
            localStorage.removeItem(this.stepperAssetIdStorageName);
            localStorage.removeItem(this.stepperPlannedMaintenanceIdStorageName);
        } else {
            localStorage.setItem(this.stepperAssetIdStorageName, assetId);
            localStorage.setItem(this.stepperPlannedMaintenanceIdStorageName, plannedMaintenanceId);
        }
    }

    getAssetCreateStepperCurrentPlannedMaintenance() {
        return localStorage.getItem(this.stepperPlannedMaintenanceIdStorageName);
    }

    setCompanyId(companyId: string) {
        localStorage.setItem('companyId', companyId);
    }

    setLoginUrl(url: string) {
        localStorage.setItem('loginUrl', url);
    }

    getLoginUrl() {
        return localStorage.getItem('loginUrl');
    }

    removeLoginUrl() {
        localStorage.removeItem('loginUrl');
    }
}
