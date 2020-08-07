import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/_core/_services';

@Component({ templateUrl: 'customer.component.html'})
export class CustomerComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    
}