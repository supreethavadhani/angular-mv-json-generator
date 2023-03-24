import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { basePath } from '../data/formData';
import { DownloadService } from '../services/downloadService/download.service';

@Component({
  selector: 'app-template-generator',
  templateUrl: './template-generator.component.html',
  styleUrls: ['./template-generator.component.scss']
})
export class TemplateGeneratorComponent {
  constructor( private fb:FormBuilder, private ds: DownloadService){}

  templateForm = new FormGroup({
    templateName: new FormControl('', [ Validators.pattern(/^-\s/)]),
    htmlSelector: new FormControl('', ),
    templateType: new FormControl('', ),
    enableRoutes: new FormControl('', []),
    buttons: this.fb.array([], ),
  });

  templateTypes = [
    {name:"form",displayName:"Form"},
    {name:"table",displayName:"Table"}
  ]

  actions = [
    {name:"Create",displayName:"Create Record"},
    {name:"Navigate",displayName:"Navigate"},
    {name:"Update", displayName:"Update Record"}
  ]

  buttonType = [
    {name:"Primary",displayName:"Primary"},
    {name:"Secondary",displayName:"Secondary"}
  ]

  get buttons() {
    return this.templateForm.controls["buttons"] as FormArray;
  }

  public addButton() {
    const buttonForm = this.fb.group({
      name: ['', [ Validators.pattern(/^-\s/)]],
      action: ['', ],
      buttonType: ['', ],
      routeOnClick:['', ]
    }) as FormGroup;
    this.buttons.push(buttonForm);
  }

  deleteButton(buttonIndex: number) {
    this.buttons.removeAt(buttonIndex);
  }
  generateJsonFile() {
    const data = this.templateForm.getRawValue();
    const fileName = this.templateForm.controls['templateName'].value + ".template"
    this.ds.downloadFile(fileName,data,basePath+"/template/")
  }
}