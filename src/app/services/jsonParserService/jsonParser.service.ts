import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formNames, formObjects, pageNames, pageObjects, recordNames, recordObjects, templateNames, templateObjects } from '../../data/formData';
import { FormObject, PageObject, RecordObject, TemplateObject  } from '../../interfaces';


@Injectable()
export class JsonParserService {

  constructor(private http: HttpClient) { }
  processFormData(forms:any[]) {
    recordNames.length = 0;
    forms.forEach(form => {
      formNames.push(form.name);
      formObjects.push(form);
    });
  }

  processRecordData(records:any[]) {
    recordNames.length = 0;
    records.forEach(record => {
      recordNames.push(record.name);
      recordObjects.push(record);
    });
  }

  processTemplateData(templates:any[]) {
    templateObjects.length = 0;
    templates.forEach(template => {
      templateNames.push(template.templateName);
      templateObjects.push(template);
    });
  }

  processPageData(pages:any[]) {
    pageObjects.length = 0;
    pages.forEach(page => {
      pageNames.push(page.pageName);
      pageObjects.push(page);
    });
  }

  getJsonObject(f:string){
    return(JSON.parse(f))
  }
}
