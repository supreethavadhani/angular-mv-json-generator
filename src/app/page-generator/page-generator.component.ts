import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { basePath, formNames, templateNames, templateObjects } from '../data/formData';
import { DownloadService } from '../services/downloadService/download.service';

@Component({
  selector: 'app-page-generator',
  templateUrl: './page-generator.component.html',
  styleUrls: ['./page-generator.component.scss']
})
export class PageGeneratorComponent {
  public templateNames:string[] = [];
  public forms: string[] = [];

  constructor(public fb:FormBuilder, private ds:DownloadService) {
    this.templateNames = templateNames;
    this.forms = formNames;
  }

  pageForm = new FormGroup({
    pageName: new FormControl('', [Validators.required, Validators.pattern(/^-\s/)]),
    componentForm: new FormControl('', Validators.required),
    templateType: new FormControl('', Validators.required),
    pageSelector: new FormControl('', Validators.required),
    pageRoute: new FormControl('', [Validators.required]),
    navMenuName:new FormControl('',[Validators.required]),
    isSavePage:new FormControl('',[Validators.required]),
    editRoute: new FormControl('',[Validators.required]),
    routeTo: this.fb.array([], Validators.required),
  });

  onOptionSelected($event:any){
    this.pageForm.controls['routeTo'].clear()
    this.pageForm.controls['templateType'].patchValue($event.value)
    let templateButtons:any[] = templateObjects.filter(b=>b.templateName == $event.value)[0].buttons
    templateButtons.map(x=>this.addButton(x.name))
    console.log(this.pageForm.getRawValue())
  }

  get routeTo() {
    return this.pageForm.controls["routeTo"] as FormArray;
  }

  public addButton(buttonName:string) {
    const buttonForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^-\s/)]],
      route: ['', Validators.required],
    }) as FormGroup;
    buttonForm.controls['name'].patchValue(buttonName);
    this.routeTo.push(buttonForm);
    console.log(this.routeTo.controls)
  }

  public generateRaw() {
    const data = this.pageForm.getRawValue();
    const fileName = this.pageForm.controls['pageName'].value + ".page"
    this.ds.downloadFile(fileName,data,basePath+"/page/")
  }
}
