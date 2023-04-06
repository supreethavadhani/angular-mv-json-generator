import {
  Component
} from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';
import {
  FileService
} from './services/fileService/file-service.service';
import {
  JsonParserService
} from './services/jsonParserService/jsonParser.service';
import {
  FORM_EXT,
  PAGE_EXT,
  RECORD_EXT,
  TEMPLATE_EXT
} from './interfaces';
import {
  basePath,
  basePathSetter,
  recordNames
} from './data/formData';
import {
  HttpClient
} from '@angular/common/http';
import {
  HighlightLoader,
  HighlightAutoResult
} from 'ngx-highlightjs';
const themeGithub: string = 'node_modules/highlight.js/styles/github.css';
const themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';
import * as ts from "typescript";
import {
  DownloadService
} from './services/downloadService/download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mv-json-generator';
  pathName = new FormControl('', );
  formName = new FormControl('', );
  response: HighlightAutoResult | undefined;
  formCode = ``;
  recordCode = ``;
  showCode:boolean = false;
  showSpinner:boolean = false;

  currentTheme: string = themeGithub;
  constructor(private jsonParserService: JsonParserService, private http: HttpClient, private hljsLoader: HighlightLoader, private downloadService: DownloadService) {}
  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

  getFiles() {
    let path = this.pathName.value;
    if (path)
      basePathSetter(path);
    this.http.get < any > ('http://localhost:3000/json-files?folderPath=' + path).subscribe(
      data => {
        console.log(data)
        this.jsonParserService.processFormData(data.form);
        this.jsonParserService.processRecordData(data.record);
        this.jsonParserService.processPageData(data.page);
        this.jsonParserService.processTemplateData(data.template);
        this.jsonParserService.processApplicationData(data.application)
      },
      err => {
        console.log(err)
      })
  }

  getSmartForm() {
    this.showSpinner = true;
    this.showCode = false;
    let formData = this.formName.value;
    if (formData)
      this.http.get < any > ('http://localhost:3000/openai-form?formName=' + formData).subscribe(
        data => {
          this.showSpinner = false;
          this.showCode = true;
          let code = data;
          this.formCode = data.form;
          this.recordCode = data.record;
        },
        err => {
          console.log(err)
        })
  }

  downloadForm() {
    this.downloadService.downloadFile(this.formName.value + ".frm", this.formCode, basePath + "/form/");
  }
  downloadRecord() {
    this.downloadService.downloadFile(this.formName.value + ".rec", this.recordCode, basePath + "/rec/");
  }
}
