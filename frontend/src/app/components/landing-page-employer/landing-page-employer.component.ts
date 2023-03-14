import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-landing-page-employer',
  templateUrl: './landing-page-employer.component.html',
  styleUrls: ['./landing-page-employer.component.css']
})
export class LandingPageEmployerComponent {


  breadcrumb: Array<[string, string]> = [];

  constructor(private accountService: AccountService, private breadcrumbService: BreadcrumbService, private router: Router) { }

  ngOnInit(): void {

    // get breadcrumb
    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));
  }

  // get last breadcrumb
  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  makeRedirection(btnClicked: string): void {

    if (btnClicked === 'student') {
      this.router.navigate(['/']);
      return;
    }

    if (!this.accountService.userValue())
      this.router.navigate(['index/login']);
    else
      this.router.navigate(['index/employer/new-internship']);
  }
}
