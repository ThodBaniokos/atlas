import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class GetFileService {

  getFilesEndpoint: string = 'http://localhost:9000/grades';
  getLastFileEndpoint: string = 'http://localhost:9000/file/';

  lastFile: any;

  lastFileBlob!: Blob;

  constructor(private http: HttpClient) {

    this.lastFile = '';
  }

  // returns the name of the last file uploaded
  async getNameOfLastFile() {
    this.lastFile = await this.getLastFile();

    if (this.lastFile.length === 0) {
      return new Promise((resolve, reject) => {
        resolve('No files uploaded');
      });
    }

    let maxFile = this.lastFile[0];

    this.lastFile.forEach((file: any) => {

      if (file.id > maxFile.id) {
        maxFile = file;
      }
    });

    this.lastFile = maxFile;
    this.getFile();
  }

  // returns the last file uploaded
  getLastFile() {

    return firstValueFrom(this.http.get(this.getFilesEndpoint));
  }

  async getFile() {

    this.lastFileBlob = await this.getFileBlob();
  }

  async getFileByPath(grades: Grade) {

    return await firstValueFrom(this.http.get(this.getLastFileEndpoint + grades.pdf?.path, { responseType: 'blob' }));
  }

  openFileToView() {

    const fileURL = URL.createObjectURL(this.lastFileBlob);
    window.open(fileURL, '_blank');
  }

  async openFileToViewByPath(grades: Grade) {

    let file = await this.getFileByPath(grades);
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  }

  async getFileBlob() {

    return await firstValueFrom(this.http.get(this.getLastFileEndpoint + this.lastFile.pdf.path, { responseType: 'blob' }));
  }

}
