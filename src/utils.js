// Checks whether given password is valid
export function verifyPassword(password) {
  return password.length >= 5;    
}

// Checks whether given email is valid (email@domain.com|edu|br)
export function verifyEmail(email) {
  let regex = new RegExp("\\b[a-z0-9]+@[a-z]+\.(?:[A-Z]{2}|com|edu|br)\\b");
  return regex.test(email);
}
