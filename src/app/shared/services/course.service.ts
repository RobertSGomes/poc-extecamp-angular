import { CreateOfferingDTO } from './../dtos/create-offering.dto';
import { Injectable } from '@angular/core';
import { CreateCourseDTO } from '../dtos/create-course.dto';
import { HttpClient } from '@angular/common/http';
import { getAccessToken } from '../utils/access-token.util';
import { Router } from '@angular/router';
import { CourseModel, OfferingModel } from '../models/course.model';
import { AssignCoordinationDTO } from '../dtos/assign-coordination.dto';
import { AssignUnicampDTO } from '../dtos/assign-unicamp.dto';
import { AssignAttachedDTO } from '../dtos/assign-attached.dto';
import { AssignUnattachedDTO } from '../dtos/assign-unattached.dto';
import { AssignSpeakerDTO } from '../dtos/assign-speaker.dto';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseURL: string = 'http://localhost:3003/cursos';
  accessToken: string | null = getAccessToken('professor');

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  getOne(courseId: string) {
    this.verifyAccess();

    return this.http.get<CourseModel>(`${this.baseURL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  createCourse(createCourseDTO: CreateCourseDTO) {
    this.verifyAccess();

    return this.http.post<CourseModel>(`${this.baseURL}`, createCourseDTO, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  assignCoordination(
    courseId: string,
    assignCoordinationDTO: AssignCoordinationDTO
  ) {
    this.verifyAccess();

    return this.http.post<CourseModel>(
      `${this.baseURL}/${courseId}/coordenacao`,
      assignCoordinationDTO,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  assignUnicamp(courseId: string, assignUnicampDTO: AssignUnicampDTO) {
    this.verifyAccess();

    return this.http.post<Array<{ id: string; carga_horaria: string }>>(
      `${this.baseURL}/${courseId}/docentes/unicamp`,
      assignUnicampDTO,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  unassignUnicamp(courseId: string, professorId: string) {
    this.verifyAccess();

    return this.http.delete<Array<{ id: string; carga_horaria: string }>>(
      `${this.baseURL}/${courseId}/docentes/unicamp/${professorId}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  assignAttached(courseId: string, assignAttachedDTO: AssignAttachedDTO) {
    this.verifyAccess();

    return this.http.post<
      Array<{ id: string; funcao: string; carga_horaria: string }>
    >(`${this.baseURL}/${courseId}/docentes/com-vinculo`, assignAttachedDTO, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  unassignAttached(courseId: string, professorId: string) {
    this.verifyAccess();

    return this.http.delete<
      Array<{ id: string; funcao: string; carga_horaria: string }>
    >(`${this.baseURL}/${courseId}/docentes/com-vinculo/${professorId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  assignUnattached(courseId: string, assignUnattachedDTO: AssignUnattachedDTO) {
    this.verifyAccess();

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
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  unassignUnattached(courseId: string, professorId: string) {
    this.verifyAccess();

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
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  assignSpeaker(courseId: string, assignSpeakerDTO: AssignSpeakerDTO) {
    this.verifyAccess();

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
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  unassignSpeaker(courseId: string, speakerId: string) {
    this.verifyAccess();

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
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  createOffering(courseId: string, createOfferingDTO: CreateOfferingDTO) {
    this.verifyAccess();

    return this.http.post<OfferingModel>(
      `${this.baseURL}/${courseId}/oferecimento`,
      createOfferingDTO,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  verifyAccess(): void {
    if (!this.accessToken) {
      this.router.navigate(['']);
    }
  }
}
