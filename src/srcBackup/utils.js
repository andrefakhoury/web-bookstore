// Checks whether given password is valid
export function verifyPassword(password, errorMessage) {
  if (password.length < 5)
    throw errorMessage;
}

// Checks whether given email is valid (email@domain.com|edu|br)
export function verifyEmail(email, errorMessage) {
  let regex = new RegExp("\\b[a-z0-9]+@[a-z]+\.(?:[A-Z]{2}|com|edu|br)\\b");
  if(!regex.test(email))
    throw errorMessage;
}

export function verifyEqual(val1, val2, errorMessage) {
  if (val1 !== val2)
    throw errorMessage;
}

// Return an array of 'size' random samples from arr
export async function getRandomSubarray(arr, size) {
  let shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

// Fetch from database
export async function fetchBook(id){
  const res = await fetch(`http://localhost:5000/books/${id}`);
  const data = await res.json();
  return data;
}

export async function fetchBooks(genre) {
  let booksToFetch = `?category=${genre}`;
  if (genre === "" || genre === "all")
    booksToFetch = "";

  const res = await fetch(`http://localhost:5000/books${booksToFetch}`);
  const data = await res.json();
  return data;
}

// Fetch from database
export async function fetchUser(id){
  const res = await fetch(`http://localhost:5000/users/${id}`);
  const data = await res.json();
  return data;
}