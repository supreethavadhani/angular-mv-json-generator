import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from './services/fileService/file-service.service';
import { JsonParserService } from './services/jsonParserService/jsonParser.service';
import { FORM_EXT, PAGE_EXT, RECORD_EXT, TEMPLATE_EXT } from './interfaces';
import { basePath, basePathSetter, recordNames } from './data/formData';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mv-json-generator';
  pathName = new FormControl('',Validators.required);
  constructor(private jsonParserService : JsonParserService, private http: HttpClient){}
  

  getFiles(){
    let path = this.pathName.value;
    if(path)
    basePathSetter(path);
    this.http.get<any>('http://localhost:3000/json-files?folderPath='+path).subscribe(
      data => {
        console.log(data)
        this.jsonParserService.processFormData(data.form);
        this.jsonParserService.processRecordData(data.record);
        this.jsonParserService.processPageData(data.page);
        this.jsonParserService.processTemplateData(data.template);
        this.jsonParserService.processApplicationData(data.application)
    },
    err=>{
      console.log(err)
    })  
  }

}
