import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GetFileService } from 'src/app/services/get-file.service';
import providerType from 'src/app/files/providerType.json';
import providerTob from 'src/app/files/providerTob.json';
import doy from 'src/app/files/doy.json';
import countries from 'src/app/files/countries.json';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.component.html',
  styleUrls: ['./profile-change.component.css']
})
export class ProfileChangeComponent {

  changeProfileForm!: FormGroup;
  // changeProfileFormProvider!: FormGroup;

  breadcrumb: Array<[string, string]> = [];

  providerTypes: Array<string> = JSON.parse(JSON.stringify(providerType));

  providerTypeOfBussines: Array<string> = JSON.parse(JSON.stringify(providerTob));

  providerDoy: Array<string> = JSON.parse(JSON.stringify(doy));

  providerCountries: Array<string> = JSON.parse(JSON.stringify(countries));

  selectedCountry!: string;
  selectedDoy!: string;
  selectedTob!: string
  selectedType!: string;

  user!: User;

  fileToUpload: File | null = null;

  constructor(private getFileService: GetFileService, private fileUploadService: FileUploadService, private formBuilder: FormBuilder, private accountService: AccountService, private router: Router, private breadcrumbService: BreadcrumbService) { }

  async ngOnInit() {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    this.user = this.accountService.userValue() as User;

    this.selectedCountry = this.providerCountries[this.providerCountries.findIndex((country: string) => country === this.user.providerAddress?.split(',')[2].trim())];
    this.selectedDoy = this.providerDoy[this.providerDoy.findIndex((doy: string) => doy === this.user.providerDoy)];
    this.selectedTob = this.providerTypeOfBussines[this.providerTypeOfBussines.findIndex((tob: string) => tob === this.user.providerTob)];
    this.selectedType = this.providerTypes[this.providerTypes.findIndex((type: string) => type === this.user.providerType)];

    if (this.user.userType === 'student') {

      await this.getGradesFilename();

      if (this.getFileService.lastFile.pdf !== undefined)
        this.user.gradesFile = this.getFileService.lastFile.pdf.path;
    }

    this.changeProfileForm = this.formBuilder.group({

      providerName: [this.user.providerName, Validators.required],
      providerType: [this.user.providerType, Validators.required],
      providerTob: [this.user.providerTob, Validators.required],
      email: [this.user.email, Validators.required],
      providerLandline: [this.user.providerLandline, Validators.required],
      providerAddress: [this.user.providerAddress, Validators.required],
      providerWebpage: [this.user.providerWebpage, Validators.required],
      providerAfm: [this.user.providerAfm, Validators.required],
      providerDoy: [this.user.providerDoy, Validators.required],
      providerId: [this.user.providerId, Validators.required],
      userType: [this.user.userType, Validators.required],
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      department: [this.user.department],
      id: [this.user.id, Validators.required],
    });

    if (this.breadcrumb[this.breadcrumb.length - 1][0] === 'id') {
      console.log('id');
      console.log(this.breadcrumb[this.breadcrumb.length - 1][1])
    }
  }

  async getGradesFilename() {
    await this.getFileService.getNameOfLastFile();
  }

  isStudent(): boolean {

    return this.user?.userType === 'student';
  }

  getFileName(): string {

    // if there is a file to upload return its name
    if (this.fileToUpload) {
      return this.fileToUpload.name;
    }

    return this.user.gradesFile || "Δεν έχει δωθεί αρχείο";
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  getTextForAvatar() {

    return this.user?.firstname.charAt(0) + this.user?.lastname.charAt(0);
  }

  goToProfile(): void {

    this.router.navigate(['index/profile', this.user.id]);
  }

  // On file Select
  onChange(event: any) {

    // if there are files
    if (event.target.files && event.target.files.length > 0) {

      this.fileToUpload = event.target.files[0];
    }
  }

  changeInformation(): void {

    this.fileUploadService.uploadFile(this.fileToUpload!).subscribe((response) => {

      this.router.navigate(['index/profile', this.user.id]);
    });
  }

  onSubmit(): void {

    if (this.changeProfileForm.invalid) {

      return;
    }

    firstValueFrom(this.accountService.updateUser(this.changeProfileForm.value)).
      then((response: any) => {

        if (response.status == 200) {

          if (this.fileToUpload) {

            this.changeInformation();
          }
          else {

            this.router.navigate(['index/profile', this.user.id]);
          }
        }
      })
      .catch((error: HttpErrorResponse) => {

        console.log(error);
      });
  }
}
