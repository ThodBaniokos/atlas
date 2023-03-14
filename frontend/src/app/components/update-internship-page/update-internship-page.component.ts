import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Internship } from 'src/app/models/intership';
import { AccountService } from 'src/app/services/account.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { InternshipService } from 'src/app/services/internship.service';
import locations from 'src/app/files/locations.json';
import universities from 'src/app/files/universities.json';

export interface DepartmentsGroup {
  university: string;
  department: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-update-internship-page',
  templateUrl: './update-internship-page.component.html',
  styleUrls: ['./update-internship-page.component.css']
})
export class UpdateInternshipPageComponent {

  updateInternshipForm!: FormGroup;

  breadcrumb: Array<[string, string]> = [];

  internship!: Internship;

  locations: string[] = locations;

  filteredOptions!: Observable<string[]>;

  internshipTypes: Array<string> = ['Πλήρης απασχόληση', 'Μερική Απασχόληση'];

  employmentTime: Array<string> = ['Τρεις μήνες', 'Έξι μήνες'];

  departmentsGroup: DepartmentsGroup[] = [];

  departmentsGroupOptions!: Observable<DepartmentsGroup[]>;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private internshipService: InternshipService, private activatedRoute: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService) { }

  async ngOnInit() {

    let universitiesNames: string[] = Object.keys(universities);

    universitiesNames.forEach(uni => {

      let depts: string[] = JSON.parse(JSON.stringify(universities))[uni];
      this.departmentsGroup.push({ university: uni, department: depts });
    });

    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    await this.internshipService.getInternshipById(Number(this.activatedRoute.snapshot.params['id'])).then((data: Internship) => {

      this.internship = data;
    });

    this.updateInternshipForm = this.formBuilder.group({

      id: [this.internship.id],
      author: [this.internship.author],
      title: [this.internship.title, Validators.required],
      description: [this.internship.description, [Validators.required, Validators.maxLength(255)]],
      department: [this.internship.department, Validators.required],
      employmentType: [this.internship.employmentType, Validators.required],
      duration: [(this.internship.duration === 'Τρεις μήνες') ? 'Τρεις μήνες' : 'Έξι μήνες', Validators.required],
      startDate: [this.internship.startDate, Validators.required],
      endDate: [this.internship.endDate, Validators.required],
      employmentLocation: [this.internship.employmentLocation, Validators.required],
      remunerationAmt: [this.internship.remunerationAmt, Validators.required],
      enabled: [false, Validators.required],
    });

    this.filteredOptions = this.f['employmentLocation'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.departmentsGroupOptions = this.f['department']!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }

  get f() { return this.updateInternshipForm.controls; }

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

  goToJobListing(internship: Internship) {

    this.router.navigate(['index/employer/internships/examine', internship.id]);
  }

  updateInternship() {

    if (this.updateInternshipForm.invalid) {

      return;
    }

    if (this.f['duration'].value === 'Τρεις μήνες') {
      this.f['duration'].setValue(3);
    }
    else {
      this.f['duration'].setValue(6);
    }

    this.internshipService.updateInternship(this.updateInternshipForm.value).subscribe(res => {

      this.goToJobListing(res as Internship);
    });
  }
}
