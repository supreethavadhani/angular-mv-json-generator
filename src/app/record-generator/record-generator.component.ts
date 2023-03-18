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

@Component({
  selector: 'app-record-generator',
  templateUrl: './record-generator.component.html',
  styleUrls: ['./record-generator.component.scss']
})
export class RecordGeneratorComponent {
  constructor(private fb: FormBuilder) {

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

  dataTypes = [{
      name: "integer",
      displayName: "Integer"
    },
    {
      name: "decimal",
      displayName: "Decimal"
    },
    {
      name: "name",
      displayName: "Name"
    },
    {
      name: "bool",
      displayName: "Boolean"
    },
    {
      name: "text",
      displayName: "Text"
    },
    {
      name: "id",
      displayName: "ID"
    },
    {
      name: "email",
      displayName: "Email"
    },
    {
      name: "phone",
      displayName: "Phone"
    }
  ]

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
      fieldType: ['', Validators.required]
    }) as FormGroup;
    this.fields.push(fieldForm);
  }

  deleteField(fieldIndex: number) {
    this.fields.removeAt(fieldIndex);
  }

  generateJsonFile() {
    const data = this.recordForm.getRawValue();
    const fileName = this.recordForm.controls['name'].value + ".rec"
    const exportType = 'json';
    exportFromJSON({
      data,
      fileName,
      exportType
    })
  }
}