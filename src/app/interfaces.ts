export const FORM_EXT = ".frm.json";
export const RECORD_EXT = ".rec.json"
export interface FormObject {
  description: string,
    "name": string,
    "recordName": string,
    "serveGuests": boolean,
    "operations": string[],
    "controls": Control[]
}

export interface RecordObject {
  "name": string,
  "nameInDb": string
  "operations": string[],
  "fields": Field[]
}


export interface Control {
  name: string,
    controlType: "input" | "hidden" | "dropdown" | "textarea",
    label ? : string
}

export interface Field {
  name:string,
  datatype:string,
  dbColumnName: string,
  fieldType: "requiredData" | "optionalData"
}
