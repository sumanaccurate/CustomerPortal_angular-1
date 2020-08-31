import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CustomerCreateOrderComponent implements OnInit {
  User: any; 
  constructor(private _userservice: UserService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
 
  projects={projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false};
  ngOnInit() {
  }

  onEditClick(event, index: number) {
    // modify the vlaue of inedit
    this.projects[index].inedit = true;
  
    // code logic here
    // ...
    let Userid= localStorage.getItem('IDbint');
    this.getUserData(Userid);
  }

 
  onCancelClick(index: number) {
    this.projects[index].inedit = false;
  
    // code logic here
    // ...
  }


  getUserData(Userid){
    if(Userid!==null &&Userid!==""){
      this._userservice.getUserProfile(Userid).subscribe(  
        data => {  
         this.User = data ;  
        }  
      );  
    }
    else{
      this.router.navigate(['/user/login']);
    }
  }

}
