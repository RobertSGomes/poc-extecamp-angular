import { NgModule } from '@angular/core';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './features/home/home.module';
import { ProfessorModule } from './features/professor/professor.module';
import { StudentModule } from './features/student/student.module';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    HomeModule,
    AuthModule,
    ProfessorModule,
    StudentModule,
    SharedModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
