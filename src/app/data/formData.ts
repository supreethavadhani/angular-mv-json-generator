import { FormObject, PageObject, RecordObject, TemplateObject } from "../interfaces"

export let formObjects:FormObject[] = [];
export let formNames:string[] = [];

export let recordObjects:RecordObject[] = [];
export let recordNames:string[] = [];

export let templateObjects:TemplateObject[] = [];
export let templateNames:string[] = [];

export let pageObjects:PageObject[] = [];
export let pageNames:string[] = [];

export let templateTypes:string[] = ["table","form"]; 

export let basePath = ""

export let appDataTypes:string[] = [];
export let valueLists: string[] = [];

export function basePathSetter(path:string){
    basePath = path
}
export function basePathGetter(path:string){
    return basePath
}