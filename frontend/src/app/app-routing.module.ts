import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageStudentComponent } from './components/landing-page-student/landing-page-student.component';
import { FaqPageStudentComponent } from './components/faq-page-student/faq-page-student.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { FaqPageEmployerComponent } from './components/faq-page-employer/faq-page-employer.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RegisterPageStudentComponent } from './components/register-page-student/register-page-student.component';
import { RegisterPageEmployerComponent } from './components/register-page-employer/register-page-employer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileChangeComponent } from './components/profile-change/profile-change.component';
import { NewInternshipComponent } from './components/new-internship/new-internship.component';
import { LandingPageEmployerComponent } from './components/landing-page-employer/landing-page-employer.component';
import { InternshipPageComponent } from './components/internship-page/internship-page.component';
import { InternshipsListPageComponent } from './components/internships-list-page/internships-list-page.component';
import { UpdateInternshipPageComponent } from './components/update-internship-page/update-internship-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { EmployerGuard } from './guards/employer.guard';
import { StudentGuard } from './guards/student.guard';
import { UnderDevelopmentComponent } from './components/under-development/under-development.component';
import { MasterGuard } from './guards/master.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'index'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'not-found'
  },
  {
    path: 'index',
    children: [
      { path: '', component: LandingPageStudentComponent, },
      { path: 'employer', component: LandingPageEmployerComponent, },
      { path: 'faq-student', component: FaqPageStudentComponent, },
      { path: 'faq-employer', component: FaqPageEmployerComponent, },
      { path: 'about', component: AboutPageComponent, },
      { path: 'login', component: LoginPageComponent, canActivate: [LoggedInGuard] },
      { path: 'register', component: RegisterPageComponent, canActivate: [LoggedInGuard] },
      { path: 'register/student', component: RegisterPageStudentComponent, canActivate: [LoggedInGuard] },
      { path: 'register/employer', component: RegisterPageEmployerComponent, canActivate: [LoggedInGuard] },
      { path: 'profile/:id', component: ProfileComponent, canActivate:[MasterGuard]},
      { path: 'profile/edit/:id', component: ProfileChangeComponent, canActivate:[MasterGuard] },
      { path: 'employer/new-internship', component: NewInternshipComponent, canActivate:[EmployerGuard] },
      { path: 'employer/internships', component: InternshipsListPageComponent, canActivate:[EmployerGuard] },
      { path: 'internships/examine/:id', component: InternshipPageComponent, },
      { path: 'employer/internships/examine/:id', component: InternshipPageComponent, canActivate:[EmployerGuard] },
      { path: 'employer/internships/update/:id', component: UpdateInternshipPageComponent, canActivate:[EmployerGuard] },
      { path: 'internships/results', component: SearchPageComponent, },
      { path: 'student/applications', component: ApplicationListComponent, canActivate:[StudentGuard] },
      { path: 'under-dev', component: UnderDevelopmentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
