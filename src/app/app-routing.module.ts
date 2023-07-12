import { StudentHomeComponent } from './features/student/templates/student-home/student-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './templates/home/home.component';
import { SigninComponent } from './features/auth/templates/signin/signin.component';
import { SignupComponent } from './features/auth/templates/signup/signup.component';
import { ProfessorHomeComponent } from './features/professor/templates/professor-home/professor-home.component';
import { ProfessorOfferingComponent } from './features/professor/templates/professor-offering/professor-offering.component';
import { StudentAllCoursesComponent } from './features/student/templates/student-all-courses/student-all-courses.component';
import { StudentCourseDetailComponent } from './features/student/templates/student-course-detail/student-course-detail.component';
import { ProfessorNewOfferingComponent } from './features/professor/templates/professor-new-offering/professor-new-offering.component';
import { StudentCourseRegistrationComponent } from './features/student/templates/student-course-registration/student-course-registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
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
