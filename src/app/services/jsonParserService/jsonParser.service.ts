import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formNames, formObjects, recordNames, recordObjects } from '../../data/formData';
import { FormObject, RecordObject  } from '../../interfaces';


@Injectable()
export class JsonParserService {

  constructor(private http: HttpClient) { }
  processFormData(forms:any[]) {
    forms.forEach(form => {
      let formObj: FormObject = this.getJsonObject(form);
      formNames.push(formObj.name);
      formObjects.push(formObj);
    });
  }

  processRecordData(records:any[]) {
    recordNames.length = 0;
    records.forEach(record => {
      let recordObj: RecordObject = this.getJsonObject(record);
      recordNames.push(recordObj.name);
      recordObjects.push(recordObj);
    });
  }

  getJsonObject(f:string){
    return(JSON.parse(f))
  }
}
