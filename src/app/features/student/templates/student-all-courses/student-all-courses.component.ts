import { CourseService } from 'src/app/shared/services/course.service';
import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/shared/models/course.model';
import { formatDate } from 'src/app/shared/utils/format-date.util';
import { getUserId } from 'src/app/shared/utils/user-id.util';
import { StudentModel } from '../../models/student.model';
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'student-all-courses',
  templateUrl: './student-all-courses.component.html',
  styleUrls: ['./student-all-courses.component.css'],
})
export class StudentAllCoursesComponent implements OnInit {
  studentId: string | null = getUserId();
  student!: StudentModel;

  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
    private readonly router: Router
  ) {}

  courses: CourseModel[] = [];

  ngOnInit(): void {
    this.studentService.getOne(getUserId()).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: () => {
        this.router.navigate(['']);
      },
    });

    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getAll().subscribe({
      next: (response) => {
        this.courses = response.result.filter(
          (course) => course.curso_status === 'Andamento'
        );
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }

  formatDate = formatDate;
}
