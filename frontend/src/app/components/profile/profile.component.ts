import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { GetFileService } from 'src/app/services/get-file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  breadcrumb: Array<[string, string]> = [];

  user!: User;

  constructor(private getFileService: GetFileService, private accountService: AccountService, private router: Router, private breadcrumbService: BreadcrumbService) { }

  async ngOnInit() {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    this.user = this.accountService.userValue() as User;

    if (this.user.userType === 'student') {

      await this.getGradesFilename();

      if (this.getFileService.lastFile.pdf !== undefined)
        this.user.gradesFile = this.getFileService.lastFile.pdf.path;
    }

  }

  async getGradesFilename() {
    await this.getFileService.getNameOfLastFile();
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  getTextForAvatar() {

    return this.user.firstname.charAt(0) + this.user.lastname.charAt(0);
  }

  isStudent(): boolean {

    return this.user.userType === 'student';
  }

  goToEditProfile(): void {

    this.router.navigate(['index/profile/edit', this.user.id]);
  }

  getFileName(): string {

    return this.user.gradesFile || "Δεν έχει δωθεί αρχείο";
  }

  openFile(): void {

    this.getFileService.openFileToView();
  }
}
