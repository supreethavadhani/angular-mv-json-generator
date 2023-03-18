import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileService } from './services/fileService/file-service.service';
import { JsonParserService } from './services/jsonParserService/jsonParser.service';
import { FORM_EXT, RECORD_EXT } from './interfaces';
import { recordNames } from './data/formData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mv-json-generator';
  resourceLocation = new FormControl('',Validators.required);
  formFileContent:any[] = []
  recordFileContent:any = []
  constructor(private jsonParserService : JsonParserService){}
  
  onFileSelected(event:any): void {
    const files: File[] = event.target.files;
    for (const file of files) {
      this.readFile(file);
    }
  }

  readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      if(file.name.endsWith(FORM_EXT))
      this.formFileContent.push(reader.result)
      if(file.name.endsWith(RECORD_EXT))
      this.recordFileContent.push(reader.result)
    };
    reader.readAsText(file);
  }

  getFiles(){
    this.jsonParserService.processFormData(this.formFileContent);
    this.jsonParserService.processRecordData(this.recordFileContent);
  }

}
