import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appDataTypes, formNames, formObjects, pageNames, pageObjects, recordNames, recordObjects, templateNames, templateObjects, valueLists } from '../../data/formData';
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

  async processApplicationData(application:any){
    appDataTypes.length = 0
    valueLists.length = 0
    let dataTypes = application[0].dataTypes;
    let keys = Object.keys(dataTypes)
    keys.forEach(x=>{
      Object.keys(dataTypes[x]).forEach(y=>{
        appDataTypes.push(y)
      })
    })
    
    let valueList = application[0].valueLists
    valueList = Object.keys(valueList)
    valueList.forEach((element:string) => {
      valueLists.push(element)
    });
    console.log(valueLists)
  }

  getJsonObject(f:string){
    return(JSON.parse(f))
  }
}
