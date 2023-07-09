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
import { ProfessorOfferingComponent } from './templates/professor-offering/professor-offering.component';
import { HeaderNavbarComponent } from './shared/components/header-navbar/header-navbar.component';
import { StudentHomeComponent } from './templates/student-home/student-home.component';
import { StudentAllCoursesComponent } from './templates/student-all-courses/student-all-courses.component';
import { ProfessorNewOfferingComponent } from './templates/professor-new-offering/professor-new-offering.component';
import { StudentCourseDetailComponent } from './templates/student-course-detail/student-course-detail.component';
import { AccordionComponent } from './shared/components/accordion/accordion.component';
import { StepsComponent } from './shared/components/steps/steps.component';
import { HistoryLineComponent } from './shared/components/history-line/history-line.component';
import { StudentCourseRegistrationComponent } from './templates/student-course-registration/student-course-registration.component';
import { CourseSubscriptionStepOneComponent } from './templates/student-course-registration/components/course-subscription-step-one/course-subscription-step-one.component';
import { CourseSubscriptionStepTwoComponent } from './templates/student-course-registration/components/course-subscription-step-two/course-subscription-step-two.component';
import { FormsModule } from '@angular/forms';
import { ProfessorFormStepOneComponent } from './templates/professor-new-offering/components/step-one/professor-form-step-one/professor-form-step-one.component';
import { ProfessorFormStepTwoComponent } from './templates/professor-new-offering/components/step-one/professor-form-step-two/professor-form-step-two.component';

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
    ProfessorOfferingComponent,
    HeaderNavbarComponent,
    StudentHomeComponent,
    StudentAllCoursesComponent,
    ProfessorNewOfferingComponent,
    StudentCourseDetailComponent,
    AccordionComponent,
    StepsComponent,
    HistoryLineComponent,
    StudentCourseRegistrationComponent,
    ProfessorFormStepOneComponent,
    ProfessorFormStepTwoComponent,
    CourseSubscriptionStepOneComponent,
    CourseSubscriptionStepTwoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
