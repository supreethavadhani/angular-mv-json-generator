import {
  Component
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';
import exportFromJSON from 'export-from-json'
import { appDataTypes, basePath, valueLists } from '../data/formData';
import { DownloadService } from '../services/downloadService/download.service';

@Component({
  selector: 'app-record-generator',
  templateUrl: './record-generator.component.html',
  styleUrls: ['./record-generator.component.scss']
})
export class RecordGeneratorComponent {
  constructor(private fb: FormBuilder,private ds:DownloadService) {

  }

  recordForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^-\s/)]),
    nameInDb: new FormControl('', Validators.required),
    operations: this.fb.array([], Validators.required),
    fields: this.fb.array([], Validators.required)
  });

  operations = this.fb.group({
    create: new FormControl("Create"),
    filter: new FormControl("Filter"),
    get: new FormControl("Get"),
    update: new FormControl("Update"),
    delete: false,
  })

  fieldTypes = [{
      name: 'requiredData',
      displayName: 'Required Data'
    },
    {
      name: 'optionalData',
      displayName: 'Optional Data'
    },
    {
      name: 'generatedPrimaryKey',
      displayName: 'Generated Primary Key'
    },
  ];

  dataTypes = appDataTypes
  valueList = valueLists

  public operationChanged($event: any, y: string) {
    if ($event.checked && y == 'create') {
      this.recordForm.controls['operations'].push(this.operations.controls["create"])
      console.log(this.recordForm.getRawValue())
    }
    if (!$event.checked && y == 'create') {
      this.recordForm.controls['operations'].removeAt(this.recordForm.controls['operations'].value.findIndex(x => x == "Create"))
      console.log(this.recordForm.getRawValue())
    }
    if ($event.checked && y == 'filter') {
      this.recordForm.controls['operations'].push(this.operations.controls["filter"])
      console.log(this.recordForm.getRawValue())
    }
    if (!$event.checked && y == 'filter') {
      this.recordForm.controls['operations'].removeAt(this.recordForm.controls['operations'].value.findIndex(x => x == "Filter"))
      console.log(this.recordForm.getRawValue())
    }
  }

  get fields() {
    return this.recordForm.controls["fields"] as FormArray;
  }

  public addField() {
    const fieldForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^-\s/)]],
      dbColumnName: ['', Validators.required],
      dataType: ['', Validators.required, Validators.pattern(/^-\s/)],
      fieldType: ['', Validators.required],
      listName:[''],
    }) as FormGroup;
    this.fields.push(fieldForm);
  }

  deleteField(fieldIndex: number) {
    this.fields.removeAt(fieldIndex);
  }

  generateJsonFile() {
    const data = this.recordForm.getRawValue();
    const fileName = this.recordForm.controls['name'].value + ".rec"
    this.ds.downloadFile(fileName,data,basePath+"/rec/")
  }
}
