import { CourseService } from 'src/app/shared/services/course.service';
import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/shared/models/course.model';
import { formatDate } from 'src/app/shared/utils/format-date.util';

@Component({
  selector: 'student-all-courses',
  templateUrl: './student-all-courses.component.html',
  styleUrls: ['./student-all-courses.component.css'],
})
export class StudentAllCoursesComponent implements OnInit {
  constructor(private readonly courseService: CourseService) {}

  courses: { result: CourseModel[]; total: number } = { result: [], total: 0 };

  ngOnInit(): void {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getAll().subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }

  formatDate = formatDate;
}
