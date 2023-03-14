import { Component, EventEmitter, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Internship } from 'src/app/models/intership';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-internships-list-page',
  templateUrl: './internships-list-page.component.html',
  styleUrls: ['./internships-list-page.component.css']
})
export class InternshipsListPageComponent {

  // @Output()
  // change!: EventEmitter<MatCheckboxChange>

  breadcrumb: Array<[string, string]> = [];

  internships!: Internship[];

  massSelectionList: Internship[] = [];

  constructor(private accountService: AccountService, private router: Router, private internshipService: InternshipService, private breadcrumbService: BreadcrumbService) { }

  async ngOnInit() {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    await this.internshipService.getInternshipsOfProvider().then((data: Internship[]) => {

      this.internships = data;
    });
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  isStudent(): boolean {

    return this.accountService.userValue()?.userType === 'student';
  }

  isLoggedIn(): boolean {

    return this.accountService.userValue() !== null;
  }

  goToInternshipProvider(internship: Internship) {

    this.router.navigate(['index/employer/internships/examine', internship.id]);
  }

  changeEvent($event: MatCheckboxChange, internship: Internship) {

    if ($event.checked) {
      this.massSelectionList.push(internship);
    }
    else {
      this.massSelectionList.splice(this.massSelectionList.indexOf(internship), 1);
    }
  }

  massEnable() {

    this.massSelectionList.forEach((internship: Internship, index: number) => {

      this.internshipService.enableInternship(internship.id).subscribe(res => {

        console.log(res);

        if (index === this.massSelectionList.length - 1) {
          window.location.reload();
        }
      });
    });
  }
}
