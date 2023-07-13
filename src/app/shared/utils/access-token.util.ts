export function getStudentAccessToken(): string | null {
  return localStorage.getItem('@StudentAccessToken');
}

export function setStudentAccessToken(access_token: string): void {
  return localStorage.setItem('@StudentAccessToken', access_token);
}

export function removeStudentAccessToken(): void {
  return localStorage.removeItem('@StudentAccessToken');
}

export function getProfessorAccessToken(): string | null {
  return localStorage.getItem('@ProfessorAccessToken');
}

export function setProfessorAccessToken(access_token: string): void {
  return localStorage.setItem('@ProfessorAccessToken', access_token);
}

export function removeProfessorAccessToken(): void {
  return localStorage.removeItem('@ProfessorAccessToken');
}
