import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import {  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEventType,HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-customer',
  templateUrl: './upload-customer.component.html',
  styleUrls: ['./upload-customer.component.css']
})
export class UploadCustomerComponent implements OnInit {
  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _SystemAdminService: SystemAdminService , private alertService : AlertService
  ) { }
  fileToUpload
  ngOnInit() {
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];
  }
  Submit(){
    const formData = new FormData();
    formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
    this._SystemAdminService.uploadExcelData( formData)
      .subscribe(
        (res: any) => {
          // this.router.navigateByUrl('/SystemAdmin/TargetSalesList');
        },
        err => {
          if (err.status == 400)
            this.alertService.error('Due to Error Data not Uploaded.');
          else
            console.log(err);;
            return
        }
      );
  }
}
