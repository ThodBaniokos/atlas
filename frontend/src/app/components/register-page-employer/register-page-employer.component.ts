import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import providerType from 'src/app/files/providerType.json';
import providerTob from 'src/app/files/providerTob.json';
import doy from 'src/app/files/doy.json';
import countries from 'src/app/files/countries.json';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-register-page-employer',
  templateUrl: './register-page-employer.component.html',
  styleUrls: ['./register-page-employer.component.css']
})
export class RegisterPageEmployerComponent {

  registerFormProvider !: FormGroup;
  registerFormProviderAddress !: FormGroup;

  breadcrumb: Array<[string, string]> = [];

  passwordRequirments: Array<[string, boolean]> = [
    ['Να περιέχει τουλάχιστον έναν κεφαλαίο χαρακτήρα', false],
    ['Να περιέχει τουλάχιστον έναν πεζό χαρακτήρα', false],
    ['Να περιέχει τουλάχιστον ένα σύμβολο', false],
    ['Να περιέχει τουλάχιστον έναν αριθμό', false],
    ['Να περιέχει τουλάχιστον 8 χαρακτήρες', false]
  ];

  providerTypes: Array<string> = JSON.parse(JSON.stringify(providerType));

  providerTypeOfBussines: Array<string> = JSON.parse(JSON.stringify(providerTob));

  providerDoy: Array<string> = JSON.parse(JSON.stringify(doy));

  filteredDoy!: Observable<string[]>;

  providerCountries: Array<string> = JSON.parse(JSON.stringify(countries));

  selectedCountry!: string;

  submitted: boolean = false;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private breadcrumbService: BreadcrumbService, private router: Router) { }

  get f() { return this.registerFormProvider.controls; }

  ngOnInit(): void {

    this.selectedCountry = this.providerCountries[this.providerCountries.findIndex((country: string) => country === 'Ελλάδα')];

    console.log(this.selectedCountry);

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    this.registerFormProvider = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      providerAddress: ['', Validators.required],
      providerName: ['', Validators.required],
      providerWebpage: ['', Validators.required],
      providerType: ['', Validators.required],
      providerLandline: ['', Validators.required],
      providerAfm: ['', Validators.required],
      providerDoy: ['', Validators.required],
      providerId: ['', Validators.required],
      providerTob: ['', Validators.required],
      userType: ['employer', Validators.required]
    },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      });

    this.registerFormProviderAddress = this.formBuilder.group({
      providerStreetNameNumber: ['', Validators.required],
      providerCity: ['', Validators.required],
      providerCountry: ['', Validators.required],
      providerPostalCode: ['', Validators.required],
    });

    this.f['password'].valueChanges.subscribe(() => {
      this.checkPasswordRequirments(this.f['password'].value);
    });

    this.filteredDoy = this.f['providerDoy'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.providerDoy.filter(option => option.toLowerCase().includes(filterValue));
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

  buildproviderAddress(): string {

    return this.registerFormProviderAddress.controls['providerStreetNameNumber'].value + ', '
      + this.registerFormProviderAddress.controls['providerCity'].value + ', '
      + this.registerFormProviderAddress.controls['providerCountry'].value + ', '
      + this.registerFormProviderAddress.controls['providerPostalCode'].value;
  }

  registerEmployer() {


    this.submitted = true;

    this.f['providerAddress'].setValue(this.buildproviderAddress());

    if (this.registerFormProvider.invalid || !this.passwordRequirments) {

      return;
    }

    this.accountService.register(this.registerFormProvider.value).subscribe((res: any) => {

      if (res.status === 200) {

        this.router.navigate(['/index/login']);
      }
    });
  }
}
