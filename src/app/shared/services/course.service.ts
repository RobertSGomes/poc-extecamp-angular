import { CreateOfferingDTO } from './../dtos/create-offering.dto';
import { Injectable } from '@angular/core';
import { CreateCourseDTO } from '../dtos/create-course.dto';
import { HttpClient } from '@angular/common/http';
import { getAccessToken } from '../utils/access-token.util';
import { Router } from '@angular/router';
import {
  CourseModel,
  OfferingCostConditionModel,
  OfferingCostModel,
  OfferingCostTaxModel,
  OfferingModel,
} from '../models/course.model';
import { AssignCoordinationDTO } from '../dtos/assign-coordination.dto';
import { AssignUnicampDTO } from '../dtos/assign-unicamp.dto';
import { AssignAttachedDTO } from '../dtos/assign-attached.dto';
import { AssignUnattachedDTO } from '../dtos/assign-unattached.dto';
import { AssignSpeakerDTO } from '../dtos/assign-speaker.dto';
import { CreateOfferingCostDTO } from '../dtos/create-offering-cost.dto';
import { CreateOfferingCostTaxDTO } from '../dtos/create-offering-cost-tax.dto';
import { CreateOfferingCostConditionDTO } from '../dtos/create-offering-cost-condition.dto';
import { UpdateOfferingDTO } from '../dtos/update-offering.dto';
import { UpdateOfferingCostDTO } from '../dtos/update-offering-cost.dto';
import { SubscribeCourseDTO } from '../dtos/subscribe-course.dto';
import { UpdateCourseDTO } from '../dtos/update-course.dto';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseURL: string = 'http://localhost:3003/cursos';
  accessTokenProfessor: string | null = getAccessToken('professor');
  accessTokenStudent: string | null = getAccessToken('student');

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  getAll() {
    const accessToken = this.verifyAccess();

    return this.http.get<{ result: CourseModel[]; total: number }>(
      `${this.baseURL}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getOne(courseId: string) {
    const accessToken = this.verifyAccess();

    return this.http.get<CourseModel>(`${this.baseURL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  createCourse(createCourseDTO: CreateCourseDTO) {
    const accessToken = this.verifyAccess();

    return this.http.post<CourseModel>(`${this.baseURL}`, createCourseDTO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  updateCourse(courseId: string, updateCourseDTO: UpdateCourseDTO) {
    const accessToken = this.verifyAccess();

    return this.http.put<CourseModel>(
      `${this.baseURL}/${courseId}`,
      updateCourseDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  assignCoordination(
    courseId: string,
    assignCoordinationDTO: AssignCoordinationDTO
  ) {
    const accessToken = this.verifyAccess();

    return this.http.post<CourseModel>(
      `${this.baseURL}/${courseId}/coordenacao`,
      assignCoordinationDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  assignUnicamp(courseId: string, assignUnicampDTO: AssignUnicampDTO) {
    const accessToken = this.verifyAccess();

    return this.http.post<Array<{ id: string; carga_horaria: string }>>(
      `${this.baseURL}/${courseId}/docentes/unicamp`,
      assignUnicampDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  unassignUnicamp(courseId: string, professorId: string) {
    const accessToken = this.verifyAccess();

    return this.http.delete<Array<{ id: string; carga_horaria: string }>>(
      `${this.baseURL}/${courseId}/docentes/unicamp/${professorId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  assignAttached(courseId: string, assignAttachedDTO: AssignAttachedDTO) {
    const accessToken = this.verifyAccess();

    return this.http.post<
      Array<{ id: string; funcao: string; carga_horaria: string }>
    >(`${this.baseURL}/${courseId}/docentes/com-vinculo`, assignAttachedDTO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  unassignAttached(courseId: string, professorId: string) {
    const accessToken = this.verifyAccess();

    return this.http.delete<
      Array<{ id: string; funcao: string; carga_horaria: string }>
    >(`${this.baseURL}/${courseId}/docentes/com-vinculo/${professorId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  assignUnattached(courseId: string, assignUnattachedDTO: AssignUnattachedDTO) {
    const accessToken = this.verifyAccess();

    return this.http.post<
      Array<{
        id: string;
        matricula: string;
        nome: string;
        documento_identificacao: {
          tipo: string;
          nmr_documento: string;
        };
        pais_origem: string;
        instituicao: string;
        titulacao: string;
        funcao: string;
        carga_horaria: string;
      }>
    >(`${this.baseURL}/${courseId}/docentes/sem-vinculo`, assignUnattachedDTO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  unassignUnattached(courseId: string, professorId: string) {
    const accessToken = this.verifyAccess();

    return this.http.delete<
      Array<{
        id: string;
        matricula: string;
        nome: string;
        documento_identificacao: {
          tipo: string;
          nmr_documento: string;
        };
        pais_origem: string;
        instituicao: string;
        titulacao: string;
        funcao: string;
        carga_horaria: string;
      }>
    >(`${this.baseURL}/${courseId}/docentes/sem-vinculo/${professorId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  assignSpeaker(courseId: string, assignSpeakerDTO: AssignSpeakerDTO) {
    const accessToken = this.verifyAccess();

    return this.http.post<
      Array<{
        id: string;
        nome: string;
        matricula: string;
        instituicao?: string;
        titulacao?: string;
        tipo_vinculo: string;
        nome_palestra: string;
        valor: string;
        carga_horaria: string;
      }>
    >(`${this.baseURL}/${courseId}/palestrantes`, assignSpeakerDTO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  unassignSpeaker(courseId: string, speakerId: string) {
    const accessToken = this.verifyAccess();

    return this.http.delete<
      Array<{
        id: string;
        nome: string;
        matricula: string;
        instituicao?: string;
        titulacao?: string;
        tipo_vinculo: string;
        nome_palestra: string;
        valor: string;
        carga_horaria: string;
      }>
    >(`${this.baseURL}/${courseId}/palestrantes/${speakerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  createOffering(courseId: string, createOfferingDTO: CreateOfferingDTO) {
    const accessToken = this.verifyAccess();

    return this.http.post<OfferingModel>(
      `${this.baseURL}/${courseId}/oferecimento`,
      createOfferingDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  updateOffering(courseId: string, updateOfferingDTO: UpdateOfferingDTO) {
    const accessToken = this.verifyAccess();

    return this.http.put<OfferingModel>(
      `${this.baseURL}/${courseId}/oferecimento`,
      updateOfferingDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  createOfferingCost(
    courseId: string,
    createOfferingCostDTO: CreateOfferingCostDTO
  ) {
    const accessToken = this.verifyAccess();

    return this.http.post<OfferingCostModel>(
      `${this.baseURL}/${courseId}/custos-oferecimento`,
      createOfferingCostDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  updateOfferingCost(
    courseId: string,
    updateOfferingCostDTO: UpdateOfferingCostDTO
  ) {
    const accessToken = this.verifyAccess();

    return this.http.put<OfferingCostModel>(
      `${this.baseURL}/${courseId}/custos-oferecimento`,
      updateOfferingCostDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  createOfferingCostTax(
    courseId: string,
    createOfferingCostTaxDTO: CreateOfferingCostTaxDTO
  ) {
    const accessToken = this.verifyAccess();

    console.log(JSON.stringify(createOfferingCostTaxDTO));

    return this.http.post<OfferingCostTaxModel>(
      `${this.baseURL}/${courseId}/custos-oferecimento/taxas`,
      createOfferingCostTaxDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  createOfferingCostCondition(
    courseId: string,
    createOfferingCostConditionDTO: CreateOfferingCostConditionDTO
  ) {
    const accessToken = this.verifyAccess();

    console.log(JSON.stringify(createOfferingCostConditionDTO));

    return this.http.post<OfferingCostConditionModel>(
      `${this.baseURL}/${courseId}/custos-oferecimento/condicoes`,
      createOfferingCostConditionDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  subscribeToCourse(courseId: string, subscribeCourseDTO: SubscribeCourseDTO) {
    const accessToken = this.verifyAccess();

    console.log(JSON.stringify(subscribeCourseDTO));

    return this.http.post<Array<CourseModel['alunos']>>(
      `${this.baseURL}/${courseId}/inscrever`,
      subscribeCourseDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  unsubscribeFromCourse(courseId: string) {
    const accessToken = this.verifyAccess();

    return this.http.delete<Array<CourseModel['alunos']>>(
      `${this.baseURL}/${courseId}/desinscrever`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  verifyAccess(): string {
    if (!this.accessTokenProfessor && !this.accessTokenStudent) {
      this.router.navigate(['']);
    }

    return this.accessTokenProfessor
      ? (this.accessTokenProfessor as string)
      : (this.accessTokenStudent as string);
  }
}
