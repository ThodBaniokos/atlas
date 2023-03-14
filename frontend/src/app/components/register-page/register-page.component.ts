import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  breadcrumb: Array<[string, string]> = [];

  constructor(private breadcrumbService: BreadcrumbService, private router: Router) { }

  ngOnInit(): void {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }
}
