export function setAccessToken(accessToken: string, path: string): void {
  if (path === 'student') {
    setStudentAccessToken(accessToken);
  } else {
    setProfessorAccessToken(accessToken);
  }
}

export function getAccessToken(path: string): string | null {
  if (path === 'student') {
    return getStudentAccessToken();
  } else {
    return getProfessorAccessToken();
  }
}

export function removeAccessToken() {
  removeStudentAccessToken();
  removeProfessorAccessToken();
}

function getStudentAccessToken(): string | null {
  return localStorage.getItem('@StudentAccessToken');
}

function setStudentAccessToken(accessToken: string): void {
  return localStorage.setItem('@StudentAccessToken', accessToken);
}

function removeStudentAccessToken(): void {
  return localStorage.removeItem('@StudentAccessToken');
}

function getProfessorAccessToken(): string | null {
  return localStorage.getItem('@ProfessorAccessToken');
}

function setProfessorAccessToken(accessToken: string): void {
  return localStorage.setItem('@ProfessorAccessToken', accessToken);
}

function removeProfessorAccessToken(): void {
  return localStorage.removeItem('@ProfessorAccessToken');
}
