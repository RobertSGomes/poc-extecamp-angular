import { Injectable } from '@angular/core';
import { CreateCourseDTO } from '../dtos/create-course.dto';
import { HttpClient } from '@angular/common/http';
import { getAccessToken } from '../utils/access-token.util';
import { Router } from '@angular/router';
import { CourseModel } from '../models/course.model';
import { AssignCoordinationDTO } from '../dtos/assign-coordination.dto';
import { AssignUnicampDTO } from '../dtos/assign-unicamp.dto';

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

  verifyAccess(): void {
    if (!this.accessToken) {
      this.router.navigate(['']);
    }
  }
}
