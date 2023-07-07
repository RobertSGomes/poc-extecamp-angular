import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './templates/home/home.component';
import { SigninComponent } from './templates/signin/signin.component';
import { SignupComponent } from './templates/signup/signup.component';
import { AllCoursesComponent } from './templates/all-courses/all-courses.component';
import { CourseComponent } from './templates/course/course.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProfessorHomeComponent } from './templates/professor-home/professor-home.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ProfesssorOfferingComponent } from './templates/professsor-offering/professsor-offering.component';
import { HeaderNavbarComponent } from './shared/components/header-navbar/header-navbar.component';
import { StudentHomeComponent } from './templates/student-home/student-home.component';
import { StudentAllCoursesComponent } from './templates/student-all-courses/student-all-courses.component';
import { NewComponent } from './templates/professor-offering/new/new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    AllCoursesComponent,
    CourseComponent,
    NavbarComponent,
    ProfessorHomeComponent,
    SidebarComponent,
    ProfesssorOfferingComponent,
    HeaderNavbarComponent,
    StudentHomeComponent,
    StudentAllCoursesComponent,
    NewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
