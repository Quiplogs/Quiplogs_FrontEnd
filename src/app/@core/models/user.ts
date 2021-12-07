import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';

export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public userName: number;
    public role: number;
    public companyId: string;
    public locationId: string;
    public password: string;
    public currentPassword: string;
    public reenteredPassword: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class UserAdapter implements Adapter<User> {
    adapt(item: any): User {
        const user = new User();
        user.id = item.id;
        user.firstName = item.firstName;
        user.lastName = item.lastName;
        user.email = item.email;
        user.userName = item.userName;
        user.role = item.role;
        user.companyId = item.companyId;
        user.locationId = item.locationId;

        return user;
    }
}
