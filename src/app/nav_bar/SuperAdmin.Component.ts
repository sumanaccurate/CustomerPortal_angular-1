import { Component } from '@angular/core';

import { User } from '@app/_core/_models';
import { AccountService } from '@app/_core/_services';

@Component({  selector: 'app-SuperAdmin',templateUrl: 'SuperAdmin.Component.html' })
export class SuperAdminComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}