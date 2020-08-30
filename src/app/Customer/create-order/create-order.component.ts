import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CustomerCreateOrderComponent implements OnInit {

  constructor() { }
  projects={projectID: 'wxp001', projectName: 'TYC001', dateOfStart: '2018-12-23', teamSize: 'L', inedit: false};
  ngOnInit() {
  }

  onEditClick(event, index: number) {
    // modify the vlaue of inedit
    this.projects[index].inedit = true;
  
    // code logic here
    // ...
  }
  
  onCancelClick(index: number) {
    this.projects[index].inedit = false;
  
    // code logic here
    // ...
  }
}
