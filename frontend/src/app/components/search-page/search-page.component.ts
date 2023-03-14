import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { SearchService } from 'src/app/services/search.service';
import locations from 'src/app/files/locations.json';
import universities from 'src/app/files/universities.json';
import { Observable, map, startWith } from 'rxjs';
import { Internship } from 'src/app/models/intership';

export interface DepartmentsGroup {
  university: string;
  department: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  breadcrumb: Array<[string, string]> = [];

  queryParametersMap: any;

  decodedURI: string = '';

  searchObject!: Map<string, string>;

  searchForm!: FormGroup;

  employmentTime: Array<string> = ['Τρεις μήνες', 'Έξι μήνες'];

  internshipTypes: Array<string> = ['Πλήρης απασχόληση', 'Μερική Απασχόληση'];

  locations: string[] = locations;

  filteredOptions!: Observable<string[]>;

  departmentsGroup: DepartmentsGroup[] = [];

  departmentsGroupOptions!: Observable<DepartmentsGroup[]>;

  internshipResults: Internship[] = [];

  constructor(private searchService: SearchService, private route: ActivatedRoute, private accountService: AccountService, private formBuilder: FormBuilder, private breadcrumbService: BreadcrumbService, private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    this.decodedURI = decodeURI(this.router.url);

    this.queryParametersMap = this.route.snapshot.queryParamMap;

    let location = this.queryParametersMap.get('location');

    let department = this.queryParametersMap.get('department');

    let startDate = this.queryParametersMap.get('startDate');

    let endDate = this.queryParametersMap.get('endDate');

    let duration = this.queryParametersMap.get('duration');

    let employmentType = this.queryParametersMap.get('employmentType');

    this.searchObject = new Map<string, string>();

    this.searchForm = this.formBuilder.group({

      location: [''],
      department: [''],
      startDate: [''],
      endDate: [''],
      duration: [''],
      employmentType: ['']
    });

    if (employmentType) {
      this.searchObject.set('employmentType', this.getSearchEmploymentType());
      this.f['employmentType'].setValue(this.getSearchEmploymentType());
    }

    if (location) {
      this.searchObject.set('emloymentLocation', this.getSearchLocation());
      this.f['location'].setValue(this.getSearchLocation());
    }

    if (department) {
      this.searchObject.set('department', this.getSearchDepartment());
      this.f['department'].setValue(this.getSearchDepartment());
    }

    if (startDate) {
      this.searchObject.set('startdate', this.getSearchStartDate().toString());
      this.f['startDate'].setValue(this.getSearchStartDate());
    }

    if (endDate) {
      this.searchObject.set('endDate', this.getSearchStartDate().toString());
      this.f['endDate'].setValue(this.getSearchEndDate());
    }

    if (duration) {
      this.searchObject.set('duration', this.getSearchDuration());
      this.f['duration'].setValue(this.getSearchDurationString());
    }

    if (this.searchObject.size > 0) {

      this.searchService.searchInternships(this.searchObject).subscribe((response: any) => {

        response.forEach((internship: Internship) => {

          if (internship.enabled && internship.assigned !== true) {

            this.internshipResults.push(internship);
          }
        });
      });
    }
    else {

      this.searchService.getAllInternships().subscribe((response: any) => {

        response.forEach((internship: Internship) => {

          if (internship.enabled && internship.assigned !== true) {

            this.internshipResults.push(internship);
          }
        });
      });
    }

    let universitiesNames: string[] = Object.keys(universities);

    universitiesNames.forEach(uni => {

      let depts: string[] = JSON.parse(JSON.stringify(universities))[uni];
      this.departmentsGroup.push({ university: uni, department: depts });
    });

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

  goToInternshipPage(internship: Internship) {

    this.router.navigate(['index/internships/examine', internship.id]);
  }

  getLastBreadcrumb(): string {

    return this.breadcrumb[this.breadcrumb.length - 1][0];
  }

  getSearchLocation() {

    return decodeURI(this.queryParametersMap.get('location'));
  }

  getSearchStartDate() {

    return new Date(decodeURI(this.queryParametersMap.get('startDate')));
  }

  getSearchEndDate() {

    return new Date(decodeURI(this.queryParametersMap.get('endDate')));
  }

  getSearchEmploymentType() {

    return decodeURI(this.queryParametersMap.get('employmentType'));
  }

  getSearchDepartment() {

    return decodeURI(this.queryParametersMap.get('department'));
  }

  getSearchDuration() {

    return decodeURI(this.queryParametersMap.get('duration'));
  }

  getSearchDurationString() {

    if (decodeURI(this.queryParametersMap.get('duration')) === '3') {

      return 'Τρεις μήνες';
    }

    if (decodeURI(this.queryParametersMap.get('duration')) === '6') {

      return 'Έξι μήνες';
    }

    return decodeURI(this.queryParametersMap.get('duration'));
  }

  getInternshipDuration(internship: Internship): string {

    if (Number(internship.duration) === 3) {

      return 'Τρεις μήνες';
    }

    return 'Έξι μήνες';
  }

  search() {

    this.searchObject = new Map<string, string>();

    let params: any = {};

    if (this.f['location'].value) {

      this.searchObject.set('location', this.f['location'].value);

      params.location = this.f['location'].value;
    }

    if (this.f['department'].value) {

      this.searchObject.set('department', this.f['department'].value);

      params.department = this.f['department'].value;
    }

    if (this.f['startDate'].value) {

      this.searchObject.set('startDate', new Date(this.f['startDate'].value).toISOString().split('T')[0]);

      params.startDate = this.searchObject.get('startDate');
    }

    if (this.f['endDate'].value) {

      this.searchObject.set('endDate', new Date(this.f['endDate'].value).toISOString().split('T')[0]);

      params.endDate = this.searchObject.get('endDate');
    }

    if (this.f['duration'].value) {

      if (this.f['duration'].value === 'Τρεις μήνες') {
        this.f['duration'].setValue(3);
      }
      else {
        this.f['duration'].setValue(6);
      }

      this.searchObject.set('duration', this.f['duration'].value);
      params.duration = this.f['duration'].value;
    }

    if (this.f['employmentType'].value) {

      this.searchObject.set('employmentType', this.f['employmentType'].value);

      params.employmentType = this.f['employmentType'].value;
    }

    this.router.navigate(['index/internships/results'], { queryParams: params });
  }
}
