import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseDetailComponent } from './student-course-detail.component';

describe('StudentCourseDetailComponent', () => {
  let component: StudentCourseDetailComponent;
  let fixture: ComponentFixture<StudentCourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCourseDetailComponent]
    });
    fixture = TestBed.createComponent(StudentCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
