import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

import { LandingPageStudentComponent } from './components/landing-page-student/landing-page-student.component';
import { LandingPageEmployerComponent } from './components/landing-page-employer/landing-page-employer.component';
import { FaqPageStudentComponent } from './components/faq-page-student/faq-page-student.component';
import { FaqPageEmployerComponent } from './components/faq-page-employer/faq-page-employer.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RegisterPageStudentComponent } from './components/register-page-student/register-page-student.component';
import { RegisterPageEmployerComponent } from './components/register-page-employer/register-page-employer.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileChangeComponent } from './components/profile-change/profile-change.component';
import { NewInternshipComponent } from './components/new-internship/new-internship.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { InternshipPageComponent } from './components/internship-page/internship-page.component';
import { InternshipsListPageComponent } from './components/internships-list-page/internships-list-page.component';
import { UpdateInternshipPageComponent } from './components/update-internship-page/update-internship-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { UnderDevelopmentComponent } from './components/under-development/under-development.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageStudentComponent,
    LandingPageEmployerComponent,
    FaqPageStudentComponent,
    FaqPageEmployerComponent,
    AboutPageComponent,
    FooterComponent,
    NavbarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegisterPageStudentComponent,
    RegisterPageEmployerComponent,
    ProfileComponent,
    ProfileChangeComponent,
    NewInternshipComponent,
    InternshipPageComponent,
    InternshipsListPageComponent,
    UpdateInternshipPageComponent,
    SearchPageComponent,
    ApplicationListComponent,
    UnderDevelopmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRippleModule,
    ScrollingModule,
    MatSnackBarModule,
    MatBadgeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'el-GR' },
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
