export function getStudentAccessToken() {
  return localStorage.getItem('@StudentAccessToken');
}

export function setStudentAccessToken(access_token: string) {
  return localStorage.setItem('@StudentAccessToken', access_token);
}

export function removeStudentAccessToken() {
  return localStorage.removeItem('@StudentAccessToken');
}

export function getProfessorAccessToken() {
  return localStorage.getItem('@ProfessorAccessToken');
}

export function setProfessorAccessToken(access_token: string) {
  return localStorage.setItem('@ProfessorAccessToken', access_token);
}

export function removeProfessorAccessToken() {
  return localStorage.removeItem('@ProfessorAccessToken');
}
