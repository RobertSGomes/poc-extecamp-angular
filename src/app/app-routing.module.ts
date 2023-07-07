import { StudentHomeComponent } from './templates/student-home/student-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './templates/home/home.component';
import { SigninComponent } from './templates/signin/signin.component';
import { SignupComponent } from './templates/signup/signup.component';
import { AllCoursesComponent } from './templates/all-courses/all-courses.component';
import { ProfessorHomeComponent } from './templates/professor-home/professor-home.component';
import { ProfessorOfferingComponent } from './templates/professor-offering/professor-offering.component';
import { StudentAllCoursesComponent } from './templates/student-all-courses/student-all-courses.component';
import { ProfessorNewOfferingComponent } from './templates/professor-new-offering/professor-new-offering.component';
import { StudentCourseDetailComponent } from './templates/student-course-detail/student-course-detail.component';
import { StudentCourseRegistrationComponent } from './templates/student-course-registration/student-course-registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'courses', component: AllCoursesComponent },
  { path: 'professor/home', component: ProfessorHomeComponent },
  { path: 'professor/offering', component: ProfessorOfferingComponent },
  { path: 'professor/offering/new', component: ProfessorNewOfferingComponent },
  { path: 'student/home', component: StudentHomeComponent },
  { path: 'student/all-courses', component: StudentAllCoursesComponent },
  { path: 'student/course-detail', component: StudentCourseDetailComponent },
  {
    path: 'student/course-register',
    component: StudentCourseRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
