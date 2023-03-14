import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  endpoint: string = 'http://localhost:9000/files/upload';

  constructor(private http: HttpClient) { }

  // uploads a file to the server
  uploadFile(file: File) {

    // create the form data to post
    let formData = new FormData();

    // set the file and the corresponding auction id
    formData.set('file', file);

    // make the request
    return this.http.post(this.endpoint, formData).pipe(map((body: any) => {

      // return the body
      return body;
    }));
  }
}
