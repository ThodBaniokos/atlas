import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loginEndpoint: string = 'http://localhost:9000/login';
  registerEndpoint: string = 'http://localhost:9000/users';
  updateEndpoint: string = 'http://localhost:9000/users';
  getUserDetailsEndpoint: string = 'http://localhost:9000/user/info'

  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;
  public redirectUrl!: string;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  // request to login
  login(username: string, password: string) {


    let loginParams: HttpParams = new HttpParams();

    // set skip authorization header
    let headers = new HttpHeaders({"Skip-Authorization": "true"});

    // set username and password to the url parameters
    loginParams = loginParams.set('username', username);
    loginParams = loginParams.set('password', password);

    // return response of post request, body of the request is null
    return this.http.post(this.loginEndpoint, null, {
      params: loginParams,
      observe: "response",
      headers: headers,
    }).pipe(map(async res => {

      // get user details first
      let user: User = await this.getUserDetails(res.headers.get('Authorization')?.toString() || '') as User;

      user.token = res.headers.get('Authorization')?.toString() || '';

      localStorage.setItem('user', JSON.stringify(user));

      this.userSubject.next(user);

      // return response
      return await res;
    }));
  }

  updateUser(user: any) {

    // return response of post request, body of the request is null
    return this.http.put(this.updateEndpoint, user, {
      observe: "response",
    }).pipe(map(async res => {

      let token = JSON.parse(localStorage.getItem('user')!).token;

      // get user details first
      let user: User = await this.getUserDetails(res.headers.get('Authorization')?.toString() || '') as User;

      user.token = token;

      localStorage.setItem('user', JSON.stringify(user));

      this.userSubject.next(user);

      // return response
      return await res;
    }));
  }

  // gets the value of the user
  userValue() {

    return this.userSubject.value;
  }

  // checks local storage for user
  // if it exists then the user is logged in
  isUserLoggedIn() {

    return localStorage.getItem('user') != null;
  }

  // logout user
  logout() {

    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  // request to register a user
  register(student: any) {

    // set skip authorization header
    let headers = new HttpHeaders({"Skip-Authorization": "true"});

    // return response of post request
    return this.http.post(this.registerEndpoint, student, { observe: "response", headers: headers }).pipe(map(res => {

      // return response
      return res;
    }));
  }

  // get the user details to store them in local storage
  // this will keep the user logged in
  // this request is asynchronous and we need to wait for it
  async getUserDetails(authorization: string) {

    let headersNew: HttpHeaders = new HttpHeaders();

    headersNew = headersNew.set('Authorization', authorization);

    // return response of get request
    return (await firstValueFrom(this.http.get(this.getUserDetailsEndpoint, { headers: headersNew, observe: "response" })))?.body;
  }

  isStudent() {

    if (this.userValue() && this.userValue()?.userType === 'student') return true;

    return false;
  }

  isEmployer() {

    if (this.userValue() && this.userValue()?.userType === 'employer') return true;

    return false;
  }
}
