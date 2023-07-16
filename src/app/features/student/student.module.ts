import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { StudentAllCoursesComponent } from './templates/student-all-courses/student-all-courses.component';
import { StudentCourseDetailComponent } from './templates/student-course-detail/student-course-detail.component';
import { StudentCourseRegistrationComponent } from './templates/student-course-registration/student-course-registration.component';
import { StudentHomeComponent } from './templates/student-home/student-home.component';
import { CourseSubscriptionStepOneComponent } from './templates/student-course-registration/components/course-subscription-step-one/course-subscription-step-one.component';
import { CourseSubscriptionStepTwoComponent } from './templates/student-course-registration/components/course-subscription-step-two/course-subscription-step-two.component';
import { CourseSubscriptionStepThreeComponent } from './templates/student-course-registration/components/course-subscription-step-three/course-subscription-step-three.component';
import { CourseSubscriptionStepFourComponent } from './templates/student-course-registration/components/course-subscription-step-four/course-subscription-step-four.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    StudentAllCoursesComponent,
    StudentCourseDetailComponent,
    StudentCourseRegistrationComponent,
    StudentHomeComponent,
    CourseSubscriptionStepOneComponent,
    CourseSubscriptionStepTwoComponent,
    CourseSubscriptionStepThreeComponent,
    CourseSubscriptionStepFourComponent,
  ],
  imports: [AppRoutingModule, ReactiveFormsModule, SharedModule, CommonModule],
  exports: [
    StudentAllCoursesComponent,
    StudentCourseDetailComponent,
    StudentCourseRegistrationComponent,
    StudentHomeComponent,
  ],
})
export class StudentModule {}
