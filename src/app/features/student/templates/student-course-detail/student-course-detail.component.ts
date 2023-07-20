import { ProfessorService } from './../../../professor/professor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/shared/models/course.model';
import { formatDate } from 'src/app/shared/utils/format-date.util';
import { getUserId } from 'src/app/shared/utils/user-id.util';
import { StudentModel } from '../../models/student.model';
import { StudentService } from '../../student.service';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';

@Component({
  selector: 'student-course-detail',
  templateUrl: './student-course-detail.component.html',
  styleUrls: ['./student-course-detail.component.css'],
})
export class StudentCourseDetailComponent implements OnInit {
  student?: StudentModel;
  course?: CourseModel;
  professors: ProfessorModel[] = [];

  courseValue: {
    parcelas: number;
    valor: string;
    formaPagamento: string;
  } = {
    parcelas: 0,
    valor: 'R$ 0,00',
    formaPagamento: '',
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly studentService: StudentService,
    private readonly professorService: ProfessorService,
    private readonly courseService: CourseService
  ) {}

  get courseId() {
    return this.activatedRoute.snapshot.paramMap.get('course_id') as string;
  }

  ngOnInit() {
    this.studentService.getOne(getUserId()).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: () => {
        this.router.navigate(['']);
      },
    });

    this.loadCourse();
    this.loadProfessors();
  }

  loadProfessors() {
    this.professorService.getAll().subscribe({
      next: (response) => {
        this.professors = response.result;
      },
    });
  }

  loadCourse() {
    this.courseService.getOne(this.courseId).subscribe({
      next: (response) => {
        this.course = response;

        this.loadCourseValue();
      },
      error: () => {
        this.router.navigate(['/student', 'courses']);
      },
    });
  }

  loadCourseValue() {
    const { valor_a_vista, parcelas_boleto, parcelas_cartao_credito } =
      this.course!.oferecimento!.custos_oferecimento!
        .condicoes_custos_oferecimento!;

    if (parcelas_boleto.length > 0 && parcelas_cartao_credito) {
      const maiorParcelaBoleto = parcelas_boleto.sort(
        (a, b) => b.nmr_parcelas - a.nmr_parcelas
      )[0].nmr_parcelas;

      if (maiorParcelaBoleto > parcelas_cartao_credito) {
        this.courseValue = {
          formaPagamento: `No boleto bancário`,
          valor: (valor_a_vista / maiorParcelaBoleto).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          parcelas: maiorParcelaBoleto,
        };
      } else if (maiorParcelaBoleto < parcelas_cartao_credito) {
        this.courseValue = {
          formaPagamento: `No cartão de crédito`,
          valor: (valor_a_vista / parcelas_cartao_credito).toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            }
          ),
          parcelas: parcelas_cartao_credito,
        };
      } else {
        this.courseValue = {
          formaPagamento: `No boleto bancário ou cartão de crédito`,
          valor: (valor_a_vista / parcelas_cartao_credito).toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            }
          ),
          parcelas: parcelas_cartao_credito,
        };
      }
    } else if (parcelas_boleto.length > 0) {
      const maiorParcelaBoleto = parcelas_boleto.sort(
        (a, b) => b.nmr_parcelas - a.nmr_parcelas
      )[0].nmr_parcelas;

      this.courseValue = {
        formaPagamento: `No boleto bancário`,
        valor: (valor_a_vista / maiorParcelaBoleto).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        parcelas: maiorParcelaBoleto,
      };
    } else if (parcelas_cartao_credito) {
      this.courseValue = {
        formaPagamento: `No cartão de crédito`,
        valor: (valor_a_vista / parcelas_cartao_credito).toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          }
        ),
        parcelas: parcelas_cartao_credito,
      };
    } else {
      this.courseValue = {
        formaPagamento: '',
        valor: valor_a_vista.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        parcelas: 0,
      };
    }
  }

  isAlreadySubscribed() {
    if (!this.course) {
      return false;
    } else {
      return !this.course.alunos.find((aluno) => aluno.id === this.student?.id);
    }
  }

  formatDate = formatDate;

  formatDateDDMMAA(date: string | undefined) {
    if (!date) return '';

    const year = new Date(date).getUTCFullYear();
    const month = new Date(date).getUTCMonth() + 1;
    const day = new Date(date).getUTCDate();

    return `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  }

  getPresencialHours() {
    if (
      !this.course?.carga_horaria_presencial_pratica &&
      !this.course?.carga_horaria_presencial_teorica
    ) {
      return 'Sem horas presenciais';
    } else if (!this.course?.carga_horaria_presencial_teorica) {
      return `${this.course?.carga_horaria_presencial_pratica} práticas presenciais`;
    } else if (!this.course?.carga_horaria_presencial_pratica) {
      return `${this.course?.carga_horaria_presencial_teorica} teóricas presenciais`;
    } else {
      return `${this.course?.carga_horaria_presencial_pratica} práticas presenciais e ${this.course?.carga_horaria_presencial_teorica} teóricas presenciais`;
    }
  }

  getEadHours() {
    if (
      !this.course?.carga_horaria_ead_pratica &&
      !this.course?.carga_horaria_ead_teorica
    ) {
      return 'Sem horas a distância';
    } else if (!this.course?.carga_horaria_ead_teorica) {
      return `${this.course?.carga_horaria_ead_pratica} práticas a distância`;
    } else if (!this.course?.carga_horaria_ead_pratica) {
      return `${this.course?.carga_horaria_ead_teorica} teóricas a distância`;
    } else {
      return `${this.course?.carga_horaria_ead_pratica} práticas a distância e ${this.course?.carga_horaria_ead_teorica} teóricas a distância`;
    }
  }

  getCargaHoraria() {
    const presencialPratica = this.course?.carga_horaria_presencial_pratica
      ? Number(this.course?.carga_horaria_presencial_pratica.replace('h', ''))
      : 0;

    const presencialTeorica = this.course?.carga_horaria_presencial_teorica
      ? Number(this.course?.carga_horaria_presencial_teorica.replace('h', ''))
      : 0;

    const eadPratica = this.course?.carga_horaria_ead_pratica
      ? Number(this.course?.carga_horaria_ead_pratica.replace('h', ''))
      : 0;

    const eadTeorica = this.course?.carga_horaria_ead_teorica
      ? Number(this.course?.carga_horaria_ead_teorica.replace('h', ''))
      : 0;

    return presencialPratica + presencialTeorica + eadPratica + eadTeorica;
  }

  getWeekAmountByHours() {
    return Math.ceil(this.getCargaHoraria() / 168);
  }

  formatHTML(text: string | undefined) {
    if (!text) return '';

    return text.replaceAll('\n', '<br />');
  }

  getProfessorName(professorId: string | null) {
    if (!professorId) return '';

    return this.professors
      .find((professor) => professor.id === professorId)
      ?.nome.toUpperCase();
  }

  getProfessorsName() {
    if (!this.course) return '';

    const courseProfessors = [];

    const unicampProfessors = this.course?.docentes_unicamp?.map((professor) =>
      this.getProfessorName(professor.id)
    );

    const vinculoProfessors = this.course?.docentes_vinculo?.map((professor) =>
      this.getProfessorName(professor.id)
    );

    const semVinculoProfessors = this.course?.docentes_sem_vinculo?.map(
      (professor) => {
        return professor.nome.toUpperCase();
      }
    );

    const palestrantes = this.course?.palestrantes?.map((palestrante) => {
      return palestrante.nome.toUpperCase();
    });

    courseProfessors.push(...unicampProfessors);
    courseProfessors.push(...vinculoProfessors);
    courseProfessors.push(...semVinculoProfessors);
    courseProfessors.push(...palestrantes);

    return courseProfessors?.join(', ');
  }
}
