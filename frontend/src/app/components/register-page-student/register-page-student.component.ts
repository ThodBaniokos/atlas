import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import universityList from 'src/app/files/universities.json';
import { Observable, map, startWith } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-page-student',
  templateUrl: './register-page-student.component.html',
  styleUrls: ['./register-page-student.component.css']
})
export class RegisterPageStudentComponent {

  registerFormStudent !: FormGroup;

  breadcrumb: Array<[string, string]> = [];

  passwordRequirments: Array<[string, boolean]> = [
    ['Να περιέχει τουλάχιστον έναν κεφαλαίο χαρακτήρα', false],
    ['Να περιέχει τουλάχιστον έναν πεζό χαρακτήρα', false],
    ['Να περιέχει τουλάχιστον ένα σύμβολο', false],
    ['Να περιέχει τουλάχιστον έναν αριθμό', false],
    ['Να περιέχει τουλάχιστον 8 χαρακτήρες', false]
  ];

  submitted: boolean = false;

  universityListArray: Array<string> = Object.keys(JSON.parse(JSON.stringify(universityList)));

  departmentList: Array<string> = [];

  filteredUniversityList!: Observable<string[]>;
  filteredDepartmentList: Observable<string[]> = new Observable<string[]>();

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private breadcrumbService: BreadcrumbService, private router: Router) { }

  get f() { return this.registerFormStudent.controls; }

  ngOnInit(): void {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    this.registerFormStudent = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      university: ['', Validators.required],
      department: ['', Validators.required],
      userType: ['student', Validators.required]
    },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      });

    this.f['department'].disable();

    this.f['password'].valueChanges.subscribe(() => {
      this.checkPasswordRequirments(this.f['password'].value);
    });

    this.f['university'].valueChanges.subscribe(() => {

      this.departmentList = JSON.parse(JSON.stringify(universityList))[this.f['university'].value];

      this.filteredDepartmentList = this.f['department'].valueChanges.pipe(
        startWith(''),
        map(value => this._filterDep(value || '')),
      );

      if (this.universityListArray.includes(this.f['university'].value)) {

        this.f['department'].enable();
      }

      if (this.f['university'].value === '') {

        this.f['department'].disable();
        this.f['department'].setValue('');
      }
    });

    this.filteredUniversityList = this.f['university'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterUni(value || ''))
    );
  }

  private _filterUni(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.universityListArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterDep(value: string): string[] {
    const filterValue = value.toLowerCase();

    return (this.departmentList || []).filter(option => option.toLowerCase().includes(filterValue));
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  checkPasswordRequirments(password: string): boolean {

    let requirementsMet: boolean = true;

    if (password.length >= 8) {

      this.passwordRequirments[4][1] = true;
    }
    else {

      requirementsMet = this.passwordRequirments[4][1] = false;
    }

    // check if password contains a capital letter
    if (/[A-Z]/.test(password)) {

      this.passwordRequirments[0][1] = true;
    }
    else {

      requirementsMet = this.passwordRequirments[0][1] = false;
    }

    // check if password contains a lowercase letter
    if (/[a-z]/.test(password)) {

      this.passwordRequirments[1][1] = true;
    }
    else {

      requirementsMet = this.passwordRequirments[1][1] = false;
    }

    // check if password contains a number
    if (/[0-9]/.test(password)) {

      this.passwordRequirments[3][1] = true;
    }
    else {

      requirementsMet = this.passwordRequirments[3][1] = false;
    }

    // check if password contains a symbol
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {

      this.passwordRequirments[2][1] = true;
    }
    else {

      requirementsMet = this.passwordRequirments[2][1] = false;
    }

    return requirementsMet;

  }

  MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['mustMatch']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  registerStudent() {

    console.log(this.registerFormStudent.value);

    this.submitted = true;

    if (this.registerFormStudent.invalid || !this.passwordRequirments) {

      console.log('invalid form');
      return;
    }

    this.accountService.register(this.registerFormStudent.value).subscribe((res: any) => {

      console.log(res);

      if (res.status === 200) {

        this.router.navigate(['/index/login']);
      }
    });
  }
}
