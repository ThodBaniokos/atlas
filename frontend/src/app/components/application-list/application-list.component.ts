import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Application } from 'src/app/models/application';
import { AccountService } from 'src/app/services/account.service';
import { ApplicationService } from 'src/app/services/application.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent {

  breadcrumb: Array<[string, string]> = [];

  applications: Application[] = [];

  massSelectionList: Application[] = [];

  doReload: boolean = false;

  constructor(private accountService: AccountService, private applicationService: ApplicationService, private router: Router, private breadcrumbService: BreadcrumbService) { }

  async ngOnInit() {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    await this.applicationService.getAllApplicationOfUser(this.accountService.userValue()!).then((data: Application[]) => {

      this.applications = data;

      console.log(this.applications);
    });

    await this.applications.forEach((application: Application) => {

      if (application.status === 'Εγκεκριμένη' && (application.seen === false || application.seen === null)) {

        this.doReload = true;

        this.applicationService.seenApplication(application).subscribe(res => {

          console.log(res);
        });
      }
    });

    if (this.doReload === true) {
      window.location.reload();
    }
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  changeEvent($event: MatCheckboxChange, application: Application) {

    if ($event.checked) {
      this.massSelectionList.push(application);
    }
    else {
      this.massSelectionList.splice(this.massSelectionList.indexOf(application), 1);
    }
  }

  goToInternshipPageStudent(application: Application) {

    this.router.navigate(['index/internships/examine', application.internship.id]);
  }

  async massEnable() {

    await this.massSelectionList.forEach(async (application: Application) => {

      let tempApplication = new Application(application);

      tempApplication.submitted = true;

      tempApplication.status = 'Εκρεμής';

      await this.applicationService.updateApplication(tempApplication);
    });

    window.location.reload();
  }

  goToSearchPage() {

    this.router.navigate(['index/internships/results']);
  }
}
