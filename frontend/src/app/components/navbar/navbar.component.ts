import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/application';
import { AccountService } from 'src/app/services/account.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  hasNotSeen!: boolean;

  constructor(private applicationService: ApplicationService, private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {


    if (this.isLoggedIn() && this.isStudent()) {

      await this.applicationService.getAllApplicationOfUser(this.accountService.userValue()!).then((results: Application[]) => {

        if (results.length > 0) {

          results.forEach((application: Application) => {

            if (application.status === 'Εγκεκριμένη' && (application.seen === false || application.seen === null)) {
              this.hasNotSeen = true;
            }
          });
        }
      });
    }
  }

  isLoggedIn(): boolean {

    return this.accountService.isUserLoggedIn();
  }

  logout(): void {

    this.accountService.logout();
  }

  getUserID() {

    return this.accountService.userValue()?.id;
  }

  goToProfile(): void {

    this.router.navigate(['index/profile', this.getUserID()]);
  }

  goToHomepage() {

    if (this.accountService.userValue()?.userType === 'student' || !this.accountService.userValue())
      this.router.navigate(['']);
    else
      this.router.navigate(['index/employer']);
  }

  isStudent(): boolean {

    return this.accountService.userValue()?.userType === 'student';
  }

  goToProviderListings() {

    this.router.navigate(['index/employer/internships']);
  }

  goToStudentApplications() {

    this.router.navigate(['index/student/applications']);
  }

  makeRedirection(url: string) {

    this.router.navigate([url]);
  }
}
