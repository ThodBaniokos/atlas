import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import locations from 'src/app/files/locations.json';
import { Observable, map, startWith } from 'rxjs';
import universities from 'src/app/files/universities.json';
import { InternshipService } from 'src/app/services/internship.service';
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
  selector: 'app-new-internship',
  templateUrl: './new-internship.component.html',
  styleUrls: ['./new-internship.component.css']
})
export class NewInternshipComponent {

  breadcrumb: Array<[string, string]> = [];

  newInternshipForm!: FormGroup;

  constructor(private intershipService: InternshipService, private formBuilder: FormBuilder, private router: Router, private breadcrumbService: BreadcrumbService) { }

  locations: string[] = locations;

  filteredOptions!: Observable<string[]>;

  internshipTypes: Array<string> = ['Πλήρης απασχόληση', 'Μερική Απασχόληση'];

  employmentTime: Array<string> = ['Τρεις μήνες', 'Έξι μήνες'];

  departmentsGroup: DepartmentsGroup[] = [];

  departmentsGroupOptions!: Observable<DepartmentsGroup[]>;

  ngOnInit(): void {

    let universitiesNames: string[] = Object.keys(universities);

    universitiesNames.forEach(uni => {

      let depts: string[] = JSON.parse(JSON.stringify(universities))[uni];
      this.departmentsGroup.push({ university: uni, department: depts });
    });

    // get breadcrumb
    this.breadcrumb = this.breadcrumbService.getBreadcrumb(this.router.url.split('/'));

    // initialize new internship form
    this.newInternshipForm = this.formBuilder.group({

      title: ['', Validators.required],
      department: ['', Validators.required],
      duration: ['', Validators.required],
      employmentType: ['', Validators.required],
      employmentLocation: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      remunerationAmt: ['', Validators.required],
      enabled: [false, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(255)]],
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

  get f() { return this.newInternshipForm.controls; }

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

  onSubmit(): void {

    console.log(this.newInternshipForm.value);

    if (this.newInternshipForm.invalid) {

      console.log('invalid form');
      console.log(this.f['assigned'].errors);
      console.log(this.f['enabled'].errors);
      return;
    }

    if (this.f['duration'].value === 'Τρεις μήνες') {
      this.f['duration'].setValue(3);
    }
    else {
      this.f['duration'].setValue(6);
    }

    console.log(this.newInternshipForm.value);

    this.intershipService.createInternship(this.newInternshipForm.value).subscribe((intership: Internship) => {

      console.log(intership);

      this.router.navigate(['index/employer/internships/examine', intership.id]);
    });
  }
}
