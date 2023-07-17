import { Component } from '@angular/core';

// Services
import { StudentService } from '../../student.service';

// Models
import { StudentModel } from '../../models/student.model';
import { RegisteredCourseModel } from '../../models/student-course.model';

// Utils
import { getUserId } from '../../../../../app/shared/utils/user-id.util';

@Component({
  selector: 'student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent {
  studentId: string | null = getUserId();
  student?: StudentModel;
  registeredCourses: RegisteredCourseModel[] = [];

  constructor(private readonly studentService: StudentService) {}

  async ngOnInit(): Promise<void> {
    this.studentService.getOne(this.studentId).subscribe((data) => {
      this.student = data;
    });
  }
}
