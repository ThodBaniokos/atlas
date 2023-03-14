import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteReuseStrategy, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm!: FormGroup;
  tryingToSubmit: boolean = false;
  badCredentials: boolean = false;

  breadcrumb: Array<[string, string]> = [];

  constructor(private accountService: AccountService, private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {

      return false;
    }
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {

    // initialize login form
    this.loginForm = this.formBuilder.group({

      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    // check for value changes and reset the error booleans
    this.f['username'].valueChanges.subscribe(() => {

      if (this.badCredentials) {

        this.badCredentials = false;
      }

      if (this.tryingToSubmit) {

        this.tryingToSubmit = false;
      }
    });

    this.f['password'].valueChanges.subscribe(() => {

      if (this.badCredentials) {

        this.badCredentials = false;
      }

      if (this.tryingToSubmit) {

        this.tryingToSubmit = false;
      }
    });
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  onSubmit(): void {

    this.badCredentials = false;

    if (this.loginForm.invalid) {

      this.tryingToSubmit = true;
      return;
    }

    firstValueFrom(this.accountService.login(this.f['username'].value, this.f['password'].value)).
      then((response: any) => {

        if (response.status == 200) {

          if (this.accountService.redirectUrl) {

            this.router.navigateByUrl(this.accountService.redirectUrl);
          }
          else if (this.accountService.userValue()?.userType === 'student') {
            this.router.navigate(['/']);
          }
          else {
            this.router.navigate(['/index/employer']);
          }
        }
      })
      .catch((error: HttpErrorResponse) => {

        if (error.status == 403) {

          this.badCredentials = true;
        }
      });
  }
}
