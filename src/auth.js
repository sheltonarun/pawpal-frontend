export function setAuth(user, token) {
  localStorage.setItem('pawpal_user', JSON.stringify(user));
  localStorage.setItem('pawpal_token', token);
}

export function clearAuth() {
  localStorage.removeItem('pawpal_user');
  localStorage.removeItem('pawpal_token');
}

export function getAuth() {
  const user = localStorage.getItem('pawpal_user');
  return user ? JSON.parse(user) : null;
}
