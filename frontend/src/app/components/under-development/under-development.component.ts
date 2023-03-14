import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-under-development',
  templateUrl: './under-development.component.html',
  styleUrls: ['./under-development.component.css']
})
export class UnderDevelopmentComponent {

  breadcrumb!: Array<[string, string]>;

  constructor(private router: Router, private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  goToHome(): void {

    this.router.navigate(['']);
  }

}
