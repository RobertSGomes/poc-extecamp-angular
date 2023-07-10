import { Component } from '@angular/core';

type RegisteredCourse = {
  sigla: string;
  oferecimento: string;
  nome: string;
  tipo: string;
  inscricao: string;
};

@Component({
  selector: 'app-student-home',
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
}
