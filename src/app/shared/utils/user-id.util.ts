export function setUserId(userId: string): void {
  localStorage.setItem('@UserId', userId);
}

export function getUserId(): string | null {
  return localStorage.getItem('@UserId');
}

export function removeUserId(): void {
  localStorage.removeItem('@UserId');
}
