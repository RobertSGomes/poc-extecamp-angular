import { StudentHomeComponent } from './templates/student-home/student-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './templates/home/home.component';
import { SigninComponent } from './templates/signin/signin.component';
import { SignupComponent } from './templates/signup/signup.component';
import { AllCoursesComponent } from './templates/all-courses/all-courses.component';
import { ProfessorHomeComponent } from './templates/professor-home/professor-home.component';
import { ProfesssorOfferingComponent } from './templates/professsor-offering/professsor-offering.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'courses', component: AllCoursesComponent },
  { path: 'professor/home', component: ProfessorHomeComponent },
  { path: 'professor/offering', component: ProfesssorOfferingComponent },
  { path: 'student/home', component: StudentHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
