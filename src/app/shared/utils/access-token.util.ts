export function getStudentAccessToken(): string | null {
  return localStorage.getItem('@StudentAccessToken');
}

export function setStudentAccessToken(accessToken: string): void {
  return localStorage.setItem('@StudentAccessToken', accessToken);
}

export function removeStudentAccessToken(): void {
  return localStorage.removeItem('@StudentAccessToken');
}

export function getProfessorAccessToken(): string | null {
  return localStorage.getItem('@ProfessorAccessToken');
}

export function setProfessorAccessToken(accessToken: string): void {
  return localStorage.setItem('@ProfessorAccessToken', accessToken);
}

export function removeProfessorAccessToken(): void {
  return localStorage.removeItem('@ProfessorAccessToken');
}
