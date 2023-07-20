import { CourseService } from 'src/app/shared/services/course.service';
import { Component } from '@angular/core';

// Services
import { StudentService } from '../../student.service';

// Models
import { StudentModel } from '../../models/student.model';

// Utils
import { getUserId } from '../../../../../app/shared/utils/user-id.util';
import { CourseModel } from 'src/app/shared/models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent {
  studentId: string | null = getUserId();
  student?: StudentModel;
  subscribedCourses: (CourseModel & {
    aluno_inscricao: {
      id: string;
      termo_compromisso_assinado: boolean;
      documentos_upload: boolean;
      cpf_upload: boolean;
      declaracao_upload: boolean;
    };
    notifications: {
      termo: boolean;
      uploads: boolean;
    };
  })[] = [];

  openedDropdownOptions = '';

  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
    private readonly router: Router
  ) {}

  get nextCourseWithTermNotification() {
    return this.subscribedCourses.find((course) => course.notifications.termo);
  }

  get nextCourseWithUploadNotification() {
    return this.subscribedCourses.find(
      (course) => course.notifications.uploads
    );
  }

  async ngOnInit(): Promise<void> {
    this.studentService.getOne(this.studentId).subscribe({
      next: (data) => {
        this.student = data;
      },
    });

    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAll().subscribe({
      next: (response) => {
        this.loadSubscribedCourses(response.result);
      },
      error: () => {
        this.subscribedCourses = [];
      },
    });
  }

  loadSubscribedCourses(courses: CourseModel[]) {
    const subscribedCourses = courses.filter(
      (course) => !!course.alunos.find((aluno) => aluno.id === this.studentId)
    );

    this.subscribedCourses = subscribedCourses.map((course) => {
      const alunoInscricao = course.alunos.find(
        (item) => item.id === this.studentId
      )!;

      return {
        ...course,
        aluno_inscricao: alunoInscricao,
        notifications: {
          termo: !alunoInscricao?.termo_compromisso_assinado,
          uploads:
            !alunoInscricao?.documentos_upload ||
            !alunoInscricao?.cpf_upload ||
            !alunoInscricao.declaracao_upload,
        },
      };
    });
  }

  verifySubscription(alunoInscricao: {
    id: string;
    termo_compromisso_assinado: boolean;
    documentos_upload: boolean;
    cpf_upload: boolean;
    declaracao_upload: boolean;
  }) {
    const {
      termo_compromisso_assinado,
      documentos_upload,
      cpf_upload,
      declaracao_upload,
    } = alunoInscricao;

    return termo_compromisso_assinado &&
      documentos_upload &&
      cpf_upload &&
      declaracao_upload
      ? 'Completa'
      : 'Incompleta';
  }

  formatIndex(index: number) {
    var formattedIndex = String(index + 1);
    var zerosToAdd = 3 - formattedIndex.length;

    for (var i = 0; i < zerosToAdd; i++) {
      formattedIndex = '0' + formattedIndex;
    }

    return formattedIndex;
  }

  handleCloseNotification(courseId: string, type: 'termo' | 'uploads') {
    const courseIndex = this.subscribedCourses.findIndex(
      (course) => course.id === courseId
    );

    this.subscribedCourses[courseIndex].notifications[type] = false;
  }

  handleSwitchDropdownOptionsState(courseId: string) {
    this.openedDropdownOptions =
      this.openedDropdownOptions === courseId ? '' : courseId;
  }

  handleEdit(courseId: string) {
    this.router.navigate(['/student', 'courses', courseId, 'register']);
  }

  handleUnsubscribe(courseId: string) {
    this.courseService.unsubscribeFromCourse(courseId).subscribe({
      next: () => {
        alert('Você se desinscreveu do curso com sucesso');
        this.loadCourses();
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }
}
