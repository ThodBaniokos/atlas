import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Application } from 'src/app/models/application';
import { Grade } from 'src/app/models/grade';
import { Internship } from 'src/app/models/intership';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ApplicationService } from 'src/app/services/application.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GetFileService } from 'src/app/services/get-file.service';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-intership-page',
  templateUrl: './internship-page.component.html',
  styleUrls: ['./internship-page.component.css']
})
export class InternshipPageComponent {

  breadcrumb: Array<[string, string]> = [];

  internship!: Internship;

  applications: Application[] = [];

  viewApplicationDetails!: Boolean;

  applicationExamined!: Application | null;

  isApplicationDenied!: boolean;

  isApplicationAccepted!: boolean;

  cancelReasoning!: string;

  student!: User;

  newApplicationForm!: FormGroup;

  oldApplicationForm!: FormGroup;

  hasStudentApplied: Boolean = false;

  updatingExisting: Boolean = false;

  submitted: Boolean = false;

  studentsApplications: Application[] = [];

  studentApplication!: Application;

  fileToUpload: File | null = null;

  constructor(private snackBar: MatSnackBar, private fileUploadService: FileUploadService, private formbuilder: FormBuilder, private getFileService: GetFileService, private applicationService: ApplicationService, private accountService: AccountService, private internshipService: InternshipService, private activatedRoute: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService) { }

  async ngOnInit() {

    this.viewApplicationDetails = false

    this.isApplicationDenied = false;

    this.isApplicationAccepted = false;

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    await this.internshipService.getInternshipById(Number(this.activatedRoute.snapshot.params['id'])).then((data: Internship) => {

      this.internship = data;
    });

    if (this.isLoggedIn() && this.accountService.userValue()?.userType === 'employer' && this.internship.enabled) {

      await this.applicationService.getAllApplicationOfInternship(this.internship).then((data: Application[]) => {

        data.forEach((application: Application) => {

          console.log(application.submitted);

          if (application.submitted === true) {

            this.applications.push(application);
          }
        });
      });
    }
    else if (this.isLoggedIn() && this.accountService.userValue()?.userType === 'student') {

      this.student = this.accountService.userValue()!;

      this.studentsApplications = await this.applicationService.getAllApplicationOfUser(this.student);

      await this.getStudentGrades();

      if (this.studentsApplications.length > 0) {

        this.studentApplication = this.studentsApplications.find((application: Application) => application.internship.id === this.internship.id)!;

        if (this.studentApplication) {

          this.hasStudentApplied = true;

          this.oldApplicationForm = this.formbuilder.group({

            id: [this.studentApplication.id, Validators.required],
            reasoning: [this.studentApplication.reasoning, [Validators.required, Validators.maxLength(255)]],
            status: [this.studentApplication.status],
            submitted: [this.studentApplication.submitted, Validators.required],
            cancelReasoning: [this.studentApplication.cancelReasoning],
            grades: [this.studentApplication.grades, Validators.required],
            internship: [this.studentApplication.internship]
          });
        }
        else {

          this.newApplicationForm = this.formbuilder.group({

            reasoning: ['', [Validators.required, Validators.maxLength(255)]],
            status: [null],
            submitted: [false, Validators.required],
            cancelReasoning: [null],
            grades: [(this.student.gradesFile !== undefined) ? { id: this.student.gradesFile?.id } : null, Validators.required],
            internship: [{ id: this.internship.id }]
          });
        }
      }
      else {

        this.newApplicationForm = this.formbuilder.group({

          reasoning: ['', [Validators.required, Validators.maxLength(255)]],
          status: [null],
          submitted: [false, Validators.required],
          cancelReasoning: [null],
          grades: [(this.student.gradesFile !== undefined) ? { id: this.student.gradesFile?.id } : null, Validators.required],
          internship: [{ id: this.internship.id }]
        });
      }
    }
  }

  get f() { return this.newApplicationForm.controls; }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  isStudent(): boolean {

    return this.accountService.userValue()?.userType === 'student';
  }

  isLoggedIn(): boolean {

    return this.accountService.userValue() !== null;
  }

  getDate(date: any): string {

    let event = new Date(date);

    return event.toLocaleDateString('el-GR');
  }

  goToProviderJobList() {

    this.router.navigate(['index/employer/internships']);
  }

  goToJobListings() {

    this.router.navigate(['index/internships/results']);
  }

  applyForInternship() {

    console.log(this.router.url);

    this.accountService.redirectUrl = this.router.url;

    this.router.navigate(['index/login']);
  }

  changeInternshipDetails(internship: Internship) {

    this.router.navigate(['index/employer/internships/update', internship.id]);
  }

  changeEvent($event: MatCheckboxChange, application: Application) {

    console.log('test');

  }

  openFileByPath(grades: Grade): void {

    this.getFileService.openFileToViewByPath(grades);
  }

  enableInternship(internship: Internship) {

    this.internshipService.enableInternship(internship.id).subscribe((res: any) => {

      window.location.reload();
    });
  }

  toggleDetails(application: Application) {

    this.viewApplicationDetails = true;

    this.applicationExamined = application;
  }

  toggleApplicationList() {

    this.viewApplicationDetails = false;

    this.applicationExamined = null;
  }

  denyApplicationToggle() {
    this.isApplicationDenied = !this.isApplicationDenied;
  }

  async denyApplicationCall(application: Application) {

    let updatedApplication: Application = new Application(application);

    updatedApplication.cancelReasoning = this.cancelReasoning;

    updatedApplication.status = "Απορρίφθηκε";

    await this.applicationService.updateApplication(updatedApplication);

    window.location.reload();
  }

  async acceptApplicationCall(application: Application) {

    let updatedApplication: Application = new Application(application);

    updatedApplication.status = "Εγκεκριμένη";

    await this.applicationService.updateApplication(updatedApplication);

    await this.internshipService.assignedIntership(application.internship);

    window.location.reload();
  }

  async getGradesFilename() {
    await this.getFileService.getNameOfLastFile();
  }

  async getStudentGrades() {

    await this.getGradesFilename();

    if (this.getFileService.lastFile.pdf !== undefined) {
      this.student.gradesFile = this.getFileService.lastFile;
    }
  }

  getFileName(): string {

    // if there is a file to upload return its name
    if (this.fileToUpload) {
      return this.fileToUpload.name;
    }

    return this.student.gradesFile?.pdf.path || "Ανέβασε αρχείο τώρα";
  }

  getFileNameUpd(): string {

    // if there is a file to upload return its name
    if (this.fileToUpload) {
      return this.fileToUpload.name;
    }

    return this.studentApplication.grades.pdf?.path || "Ανέβασε αρχείο τώρα";
  }

  async updateApplication() {

    if (this.fileToUpload) {

      console.log('uploading file');

      await this.fileUploadService.uploadFile(this.fileToUpload!).subscribe(async (response) => {

        this.oldApplicationForm.controls['grades'].setValue({ id: response.id });

        await this.applicationService.updateApplication(this.oldApplicationForm.value).then(response => {

          window.location.reload();
        });
      });

      return;
    }

    await this.applicationService.updateApplication(this.oldApplicationForm.value).then(response => {

      window.location.reload();
    });
  }

  async uploadFile() {

    await this.fileUploadService.uploadFile(this.fileToUpload!);
  }

  // On file Select
  onChange(event: any) {

    // if there are files
    if (event.target.files && event.target.files.length > 0) {

      this.fileToUpload = event.target.files[0];
    }
  }

  createApplication() {

    this.submitted = true;

    if (this.newApplicationForm.invalid && this.fileToUpload === null) {

      console.log(this.submitted);

      return;
    }

    if (this.fileToUpload) {

      this.fileUploadService.uploadFile(this.fileToUpload!).subscribe((response) => {

        this.f['grades'].setValue({ id: response.id });

        this.applicationService.newApplication(this.newApplicationForm.value).subscribe(response => {

          this.router.navigate(['index/student/applications']);

          return;
        });
      });
    }

    this.applicationService.newApplication(this.newApplicationForm.value).subscribe(response => {

      this.router.navigate(['index/student/applications']);

      return;
    });
  }

  updateExistingToggle() {

    this.updatingExisting = !this.updatingExisting;
  }

  async submitApplication(application: Application) {

    let tempApplication = new Application(application);

    tempApplication.submitted = true;

    tempApplication.status = 'Εκρεμής';

    await this.applicationService.updateApplication(tempApplication);

    window.location.reload();
  }

  deleteApplication(application: Application) {

    this.applicationService.deleteApplication(application).subscribe(res => {
      console.log(res);
      this.router.navigate(['index/student/applications']);
      this.openSnackbar('Η αίτηση διαγράφθηκε', 'ΟΚ');
    });
  }

  openSnackbar(message: string, action: string) {

    this.snackBar.open(message, action);
  }
}
