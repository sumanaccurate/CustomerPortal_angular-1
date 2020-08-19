import { UserService } from '@app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '@app/component/alert.service';
import { HomenavComponent } from '../homenav/homenav.component';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userAdd = new FormGroup({
    UserCodetxt : new FormControl(''),
    UserNametxt : new FormControl(''),
    UserTypetxt : new FormControl('SystemAdmin'),
    Divisionvtxt : new FormControl(''),
    Mobilevtxt : new FormControl(''),
    Emailvtxt : new FormControl(''),
    Passwordvtxt : new FormControl(''),
  })
  
  constructor(private service: UserService, private router: Router , private alertService : AlertService) { }


  ngOnInit(): void {
  }

  onSubmit() {

    this.service.addUser(this.userAdd.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/SuperAdmin/dashboard');
      },  
      err => {
        //  if (err.status == 400)
        //   //  this.alertService.error('Incorrect username or password.', 'Authentication failed.');
        //  else
          console.log(err);
      }
    );
  }

}
