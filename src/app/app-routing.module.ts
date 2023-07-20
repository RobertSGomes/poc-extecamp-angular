import { StudentHomeComponent } from './features/student/templates/student-home/student-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/templates/home/home.component';
import { SigninComponent } from './features/auth/templates/signin/signin.component';
import { SignupComponent } from './features/auth/templates/signup/signup.component';
import { ProfessorOfferingComponent } from './features/professor/templates/professor-offering/professor-offering.component';
import { StudentAllCoursesComponent } from './features/student/templates/student-all-courses/student-all-courses.component';
import { StudentCourseDetailComponent } from './features/student/templates/student-course-detail/student-course-detail.component';
import { ProfessorNewOfferingComponent } from './features/professor/templates/professor-new-offering/professor-new-offering.component';
import { StudentCourseRegistrationComponent } from './features/student/templates/student-course-registration/student-course-registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'professor', pathMatch: 'full', redirectTo: 'professor/offerings' },
  { path: 'professor/offerings', component: ProfessorOfferingComponent },
  {
    path: 'professor/offerings/new',
    component: ProfessorNewOfferingComponent,
  },
  {
    path: 'professor/offerings/new/:course_id',
    component: ProfessorNewOfferingComponent,
  },
  { path: 'student', component: StudentHomeComponent },
  { path: 'student/courses', component: StudentAllCoursesComponent },
  {
    path: 'student/courses/:course_id',
    component: StudentCourseDetailComponent,
  },
  {
    path: 'student/courses/:course_id/register',
    component: StudentCourseRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
