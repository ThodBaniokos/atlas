import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { Application } from '../models/application';
import { Internship } from '../models/intership';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  newApplicationEndpoint: string = 'http://localhost:9000/applications';
  getApplicationsByInternshipEndpoint: string = 'http://localhost:9000/applications/internship/';
  updateApplicationEndpoint: string = 'http://localhost:9000/applications';
  getApplicationsByUserIdEndpoint: string = 'http://localhost:9000/applications/user/';
  deleteApplicationEndpoint: string = 'http://localhost:9000/applications/'
  seenApplicationEndpoint: string = 'http://localhost:9000/applications/seen/';

  constructor(private http: HttpClient) { }

  async getAllApplicationOfInternship(internship: Internship) {

    return await firstValueFrom(this.http.get<Application[]>(this.getApplicationsByInternshipEndpoint + internship.id));
  }

  async getAllApplicationOfUser(user: User) {

    return await firstValueFrom(this.http.get<Application[]>(this.getApplicationsByUserIdEndpoint + user.id));
  }

  updateApplication(application: Application) {

    console.log(application);

    return firstValueFrom(this.http.put(this.updateApplicationEndpoint, JSON.parse(JSON.stringify(application))));

  }

  newApplication(application: Application) {

    return this.http.post(this.newApplicationEndpoint, JSON.parse(JSON.stringify(application)), { observe: "response" }).pipe(map(res => {

      return res;
    }));
  }

  deleteApplication(application: Application) {

    return this.http.delete(this.deleteApplicationEndpoint + application.id).pipe(map(res => {

      return res;
    }));
  }

  seenApplication(application: Application) {

    return this.http.put(this.seenApplicationEndpoint + application.id, null).pipe(map(res => {

      return res;
    }));
  }
}
