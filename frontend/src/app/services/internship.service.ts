import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, firstValueFrom } from 'rxjs';
import { Internship } from '../models/intership';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  newInternshipEndpoint = 'http://localhost:9000/internship';
  getAllInternshipsEndpoint = 'http://localhost:9000/internships';
  getInternshipByIdEndpoint = 'http://localhost:9000/internships/single';
  getProviderInternshipsEndpoint = 'http://localhost:9000/internships/mine';
  enableInternshipEndpoint = 'http://localhost:9000/internship/enable';
  updateInternshipEndpoint = 'http://localhost:9000/internship/';
  assignInternshipEndpoint = 'http://localhost:9000/internship/assigned/';

  constructor(private http: HttpClient) { }

  createInternship(internship: any) {

    return this.http.post<Internship>(this.newInternshipEndpoint, internship).pipe(map(res => {

      // return response
      return res;

    }));
  }

  enableInternship(id: number) {

    return this.http.put(this.enableInternshipEndpoint + '/' + id, null).pipe(map(res => {

      // return response
      return res;

    }));
  }

  updateInternship(internship: Internship) {

    return this.http.put(this.updateInternshipEndpoint, JSON.parse(JSON.stringify(internship))).pipe(map(res => {

      return res;
    }));
  }

  async getAllInternships() {

    return await firstValueFrom(this.http.get<Internship[]>(this.getAllInternshipsEndpoint));
  }

  async getInternshipById(id: number) {

    return await firstValueFrom(this.http.get<Internship>(this.getInternshipByIdEndpoint + '/' + String(id)));
  }

  async getInternshipsOfProvider() {

    return await firstValueFrom(this.http.get<Internship[]>(this.getProviderInternshipsEndpoint));
  }

  assignedIntership(internship: Internship) {

    return firstValueFrom(this.http.put(this.assignInternshipEndpoint + internship.id, null));
  }
}
