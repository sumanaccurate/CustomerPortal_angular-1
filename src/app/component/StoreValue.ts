
 import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

 export class StoreValue {
    constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {

    }

    saveInLocal(key, val): void {
        // console.log('recieved= key:' + key + 'value:' + val);
        this.storage.set(key, val);
        // this.data[key]= this.storage.get(key);
       }

       getFromLocal(key): void {
         return  this.storage.get(key);
        // console.log('recieved= key:' + key);
        // this.data[key]= this.storage.get(key);
        // console.log(this.data);
       }
}