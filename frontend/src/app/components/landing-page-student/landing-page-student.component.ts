import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Observable, map, startWith } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import locations from 'src/app/files/locations.json';
import universities from 'src/app/files/universities.json';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DepartmentsGroup {
  university: string;
  department: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-landing-page-student',
  templateUrl: './landing-page-student.component.html',
  styleUrls: ['./landing-page-student.component.css']
})
export class LandingPageStudentComponent implements OnInit {

  // search form
  searchForm !: FormGroup;

  filteredUniversities!: Observable<string[]>;
  parsedUniversities: string[] = Object.keys(JSON.parse(JSON.stringify(universities)));

  selectedLocation!: string;
  selectedUniversity!: string;

  breadcrumb: Array<[string, string]> = [];

  locations: string[] = locations;

  filteredOptions!: Observable<string[]>;

  departmentsGroup: DepartmentsGroup[] = [];

  departmentsGroupOptions!: Observable<DepartmentsGroup[]>;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {

    let universitiesNames: string[] = Object.keys(universities);

    universitiesNames.forEach(uni => {

      let depts: string[] = JSON.parse(JSON.stringify(universities))[uni];
      this.departmentsGroup.push({ university: uni, department: depts });
    });

    // initialize search form
    this.searchForm = this.formBuilder.group({

      location: [''],
      department: [''],
    });

    // get breadcrumb
    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    this.filteredOptions = this.f['location'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.departmentsGroupOptions = this.f['department']!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter(location => location.toLowerCase().includes(filterValue));
  }

  private _filterGroup(value: string): DepartmentsGroup[] {
    if (value) {
      return this.departmentsGroup
        .map(group => ({ university: group.university, department: _filter(group.department, value) }))
        .filter(group => group.department.length > 0);
    }

    return this.departmentsGroup;
  }

  get f() { return this.searchForm.controls; }

  // get last breadcrumb
  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  search(): void {

    let params: any = {};

    if (this.f['location'].value) {

      params.location = this.f['location'].value;
    }

    if (this.f['department'].value) {

      params.department = this.f['department'].value;
    }

    this.router.navigate(['index/internships/results'], {
      queryParams: params
    });
  }

  makeRedirection(btnClicked: string): void {

    if (btnClicked === 'employer') {
      this.router.navigate(['index/employer']);
      return;
    }

    if (!this.accountService.userValue())
      this.router.navigate(['index/login']);
    else
      this.router.navigate(['index/internships/results']);
  }
}
