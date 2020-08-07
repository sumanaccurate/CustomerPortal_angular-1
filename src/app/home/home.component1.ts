import { Component } from '@angular/core';

import { User } from '@app/_core/_models';
import { AccountService } from '@app/_core/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}