import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { AlertComponent } from './component';
import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({ selector: 'app',styleUrls: ['./app.component.css'], templateUrl: 'app.component.html',
animations: [
    trigger('myAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          { optional: true }
        ),
        query(
          ':leave',
           [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
    ]),
    
      ] 

})
export class AppComponent {
   
   
}