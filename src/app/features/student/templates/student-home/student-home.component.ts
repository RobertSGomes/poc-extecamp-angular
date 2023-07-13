import { Component } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { StudentService } from '../../student.service';
import { getUserId } from 'src/app/shared/utils/user-id.util';
import { RegisteredCourseModel } from '../../models/student-course.model';

@Component({
  selector: 'student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent {
  student?: StudentModel;
  registeredCourses: RegisteredCourseModel[] = [];
  private studentId: string | null = getUserId();

  constructor(private readonly studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    const response = this.studentService.getOne(this.studentId);

    response.subscribe((response) => {
      this.student = response;
    });
  }
}
