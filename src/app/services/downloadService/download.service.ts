import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  downloadFile(fileName: string, fileContent: any, folderName: string): void {
    const queryParams = {
      fileName,
      fileContent: JSON.stringify(fileContent),
      folderName,
    };

    const url = `${this.baseUrl}/download-files`;

    this.http
      .get(url, {
        responseType: 'blob',
        params: queryParams,
      })
      .subscribe((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${fileName}.json`;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      });
  }

}
