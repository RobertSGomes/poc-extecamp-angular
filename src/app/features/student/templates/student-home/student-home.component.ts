import { Component } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { StudentService } from '../../student.service';

type RegisteredCourse = {
  sigla: string;
  oferecimento: string;
  nome: string;
  tipo: string;
  inscricao: string;
};

@Component({
  selector: 'student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent {
  registeredCourses: RegisteredCourse[] = [
    // {
    //   sigla: 'BIO-0083',
    //   oferecimento: '003',
    //   nome: 'BIOQUÍMICA E FISIOLOGIA APLICADAS AO TREINAMENTO FÍSICO',
    //   tipo: 'Curso de extensão',
    //   inscricao: 'INCOMPLETA',
    // },
  ];

  student!: StudentModel;

  constructor(private readonly studentService: StudentService) {}

  ngOnInit() {
    const id = this.studentService.getStudentId();
    this.getStudent(id);
  }

  getStudent(studentId: string) {
    const response = this.studentService.getOne(studentId);

    response.subscribe((response) => {
      this.student = response;
    });
  }
}
