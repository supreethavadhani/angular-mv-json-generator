import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formNames, formObjects, pageNames, pageObjects, recordNames, recordObjects, templateNames, templateObjects } from '../../data/formData';
import { FormObject, PageObject, RecordObject, TemplateObject  } from '../../interfaces';


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

  processTemplateData(templates:any[]) {
    templateObjects.length = 0;
    templates.forEach(template => {
      let templateObj: TemplateObject = this.getJsonObject(template);
      console.log(templateObj)
      templateNames.push(templateObj.templateName);
      templateObjects.push(templateObj);
    });
  }

  processPageData(pages:any[]) {
    pageObjects.length = 0;
    pages.forEach(page => {
      let pageObj: PageObject = this.getJsonObject(page);
      pageNames.push(pageObj.pageName);
      pageObjects.push(page);
    });
  }

  getJsonObject(f:string){
    return(JSON.parse(f))
  }
}
