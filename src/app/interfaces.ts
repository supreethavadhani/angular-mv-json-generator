export const FORM_EXT = ".frm.json";
export const RECORD_EXT = ".rec.json";
export const TEMPLATE_EXT = ".template.json";
export const PAGE_EXT = ".page.json";

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

export interface TemplateObject {
  templateName:string,
  htmlSelector:string,
  templateType: string,
  enableRoutes: boolean,
  buttons:button[]
}

export interface button {
  name:string,
  action:string,
  buttonType:string,
  routeOnClick:boolean
}

export interface PageObject {
  pageName:string,
  componentForm:string,
  templateType:string,
  pageSelector:string,
  pageRoute:string,
  routes:pageRoute[]
}

export interface pageRoute {
  name:string,
  routeTo:string
}
