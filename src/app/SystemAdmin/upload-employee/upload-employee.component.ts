import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import {  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEventType,HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Component({
  selector: 'app-upload-employee',
  templateUrl: './upload-employee.component.html',
  styleUrls: ['./upload-employee.component.css']
})
export class UploadEmployeeComponent implements OnInit {
   public progress: number;
   public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _SystemAdminService: SystemAdminService , private alertService : AlertService
  ) { }

  ngOnInit(){
   
  }

    public uploadFile = (files) => {
      if (files.length === 0) {
        return;
      }
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this._SystemAdminService.uploadExcelData( formData)
        .subscribe(event => {
          // if (event.type === HttpEventType.UploadProgress)
          //   this.progress = Math.round(100 * event.loaded / event.total);
          // else if (event.type === HttpEventType.Response) {
          //   this.message = 'Upload success.';
          //   this.onUploadFinished.emit(event.body);
          // }
        });
    }
  }
  