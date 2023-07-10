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
import { StepOneFormOneComponent } from './templates/professor-new-offering/components/step-one/step-one-form-one/step-one-form-one.component';
import { StepOneFormTwoComponent } from './templates/professor-new-offering/components/step-one/step-one-form-two/step-one-form-two.component';
import { StepOneFormThreeComponent } from './templates/professor-new-offering/components/step-one/step-one-form-three/step-one-form-three.component';
import { CourseSubscriptionStepThreeComponent } from './templates/student-course-registration/components/course-subscription-step-three/course-subscription-step-three.component';
import { CourseSubscriptionStepFourComponent } from './templates/student-course-registration/components/course-subscription-step-four/course-subscription-step-four.component';
import { StepOneFormFourComponent } from './templates/professor-new-offering/components/step-one/step-one-form-four/step-one-form-four.component';
import { StepOneFormFiveComponent } from './templates/professor-new-offering/components/step-one/step-one-form-five/step-one-form-five.component';
import { StepFiveFormOneComponent } from './templates/professor-new-offering/components/step-five/step-five-form-one/step-five-form-one.component';
import { StepTwoFormOneComponent } from './templates/professor-new-offering/components/step-two/step-two-form-one/step-two-form-one.component';
import { StepTwoFormTwoComponent } from './templates/professor-new-offering/components/step-two/step-two-form-two/step-two-form-two.component';
import { StepTwoFormThreeComponent } from './templates/professor-new-offering/components/step-two/step-two-form-three/step-two-form-three.component';
import { StepTwoFormFourComponent } from './templates/professor-new-offering/components/step-two/step-two-form-four/step-two-form-four.component';
import { StepTwoFormFiveComponent } from './templates/professor-new-offering/components/step-two/step-two-form-five/step-two-form-five.component';
import { StepTwoFormSixComponent } from './templates/professor-new-offering/components/step-two/step-two-form-six/step-two-form-six.component';

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
    StepOneFormOneComponent,
    StepOneFormTwoComponent,
    CourseSubscriptionStepOneComponent,
    CourseSubscriptionStepTwoComponent,
    StepOneFormThreeComponent,
    CourseSubscriptionStepThreeComponent,
    CourseSubscriptionStepFourComponent,
    StepOneFormFourComponent,
    StepOneFormFiveComponent,
    StepFiveFormOneComponent,
    StepTwoFormOneComponent,
    StepTwoFormTwoComponent,
    StepTwoFormThreeComponent,
    StepTwoFormFourComponent,
    StepTwoFormFiveComponent,
    StepTwoFormSixComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
