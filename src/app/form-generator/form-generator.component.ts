import { Component, OnInit } from '@angular/core';
import { basePath, formNames, recordNames, recordObjects } from '../data/formData';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import exportFromJSON from 'export-from-json';
import { DownloadService } from '../services/downloadService/download.service';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit{

  public forms:string[] = [];
  public records: string[] = [];
  public filteredOptions!: Observable<string[]> ;

  constructor(public fb:FormBuilder, private ds:DownloadService){

  }
  ngOnInit(): void {
    this.forms = formNames
    this.records = recordNames;
    this.filteredOptions = this.formForm['controls'].recordName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  formForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^-\s/)]),
    recordName: new FormControl('', Validators.required),
    serveGuests: new FormControl('', Validators.required),
    operations: this.fb.array([], Validators.required),
    controls: this.fb.array([], Validators.required)
  });

  operations = this.fb.group({
    create: new FormControl("Create"),
    filter: new FormControl("Filter"),
    delete: false,
  })


  controlTypes = [{
    name: 'hidden',
    displayName: 'Hidden Field'
  },
  {
    name: 'input',
    displayName: 'Text Box'
  },
  {
    name: 'dropdown',
    displayName: 'Dropdown'
  },
  {
    name: 'textarea',
    displayName: 'Text Area'
  },
];

  private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return recordNames.filter(recordName => recordName.toLowerCase().includes(filterValue));
  }

  public operationChanged($event: any, y: string) {
    if ($event.checked && y == 'create') {
      this.formForm.controls['operations'].push(this.operations.controls["create"])
      console.log(this.formForm.getRawValue())
    }
    if (!$event.checked && y == 'create') {
      this.formForm.controls['operations'].removeAt(this.formForm.controls['operations'].value.findIndex(x => x == "Create"))
      console.log(this.formForm.getRawValue())
    }
    if ($event.checked && y == 'filter') {
      this.formForm.controls['operations'].push(this.operations.controls["filter"])
      console.log(this.formForm.getRawValue())
    }
    if (!$event.checked && y == 'filter') {
      this.formForm.controls['operations'].removeAt(this.formForm.controls['operations'].value.findIndex(x => x == "Filter"))
      console.log(this.formForm.getRawValue())
    }
  }

  get controls() {
    return this.formForm.controls["controls"] as FormArray;
  }

  public addField(fieldName?:string) {
    const controlForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^-\s/)]],
      label: ['', Validators.required],
      controlType: ['', Validators.required]
    }) as FormGroup;
    if(fieldName) {
      controlForm.controls['name'].patchValue(fieldName);
    }
    this.controls.push(controlForm);
  }

  deleteField(controlIndex: number) {
    this.controls.removeAt(controlIndex);
  }


  generateJsonFile() {
    const data = this.formForm.getRawValue();
    const fileName = this.formForm.controls['name'].value + ".frm";
    this.ds.downloadFile(fileName,data,basePath+"/form/")

  }

  async valueChangeDetector($event?:any) {
    let filteredObjects;
    await (filteredObjects = recordObjects.filter(x=>x.name == this.formForm.controls['recordName'].value))
    filteredObjects[0].fields.forEach(object=>{
      this.addField(object.name)
    })
  }

  async onOptionSelected($event:any) {
    this.formForm.controls['controls'].clear()
    await this.formForm.controls['recordName'].patchValue($event.option.value);
    this.valueChangeDetector();
  }
}
