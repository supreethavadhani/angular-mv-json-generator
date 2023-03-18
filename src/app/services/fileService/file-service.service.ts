import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }

  getFileList(): Observable<any> {
    return this.http.get("/Users/supreethavadhani/workspace/metadev-server-example/assets/spec");
  }
}
