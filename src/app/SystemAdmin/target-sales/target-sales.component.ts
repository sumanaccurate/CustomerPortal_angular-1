import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import {  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEventType,HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-target-sales',
  templateUrl: './target-sales.component.html',
  styleUrls: ['./target-sales.component.css']
})
export class SystemAdminTargetSalesComponent implements OnInit {
  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _SystemAdminService: SystemAdminService , private alertService : AlertService) { }
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
    this._SystemAdminService.uploadTargetSalesExcelData( formData)
      .subscribe(
        (res: any) => {
          this.router.navigateByUrl('/SystemAdmin/TargetSalesList');
        },
        err => {
          if (err.status == 400)
            this.alertService.error('Error Order not Inserted.');
          else
            console.log(err);;
            return
        }
      );
  }
  download() {
    this._SystemAdminService.DownloadSampleExcel().subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
			fileSaver.saveAs(blob, 'SampleTargetSales.xlsx');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
  back()
  {
    this.router.navigateByUrl('/SystemAdmin/TargetSales');
  }
}
