import { NgModule } from '@angular/core';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './features/home/home.module';
import { ProfessorModule } from './features/professor/professor.module';
import { StudentModule } from './features/student/student.module';
import { AuthModule } from './features/auth/auth.module';

// Components
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HomeModule,
    AuthModule,
    ProfessorModule,
    StudentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
