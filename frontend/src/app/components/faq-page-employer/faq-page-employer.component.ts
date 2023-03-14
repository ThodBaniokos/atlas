import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-faq-page-employer',
  templateUrl: './faq-page-employer.component.html',
  styleUrls: ['./faq-page-employer.component.css']
})
export class FaqPageEmployerComponent {

  breadcrumb: Array<[string, string]> = [];

  constructor(private breadcrumbService: BreadcrumbService, private router: Router) { }

  ngOnInit(): void {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }
}
