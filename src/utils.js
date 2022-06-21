// Checks whether given password is valid
export function verifyPassword(password, errorMessage) {
  if (password.length < 5)
    throw errorMessage;
}

// Checks whether given email is valid (email@domain.com|edu|br)
export function verifyEmail(email, errorMessage) {
  let regex = new RegExp("\\b[a-z0-9]+@[a-z]+.(?:[A-Z]{2}|com|edu|br)\\b");
  if(!regex.test(email))
    throw errorMessage;
}

// Checks whether given array is not empty
export function verifyNotEmpty(arr, errorMessage) {
  if(arr.length === 0)
    throw errorMessage;
}

// Verify if two objects are equal, throw message if not
export function verifyEqual(val1, val2, errorMessage) {
  if (val1 !== val2)
    throw errorMessage;
}

// Verify if val is a number of 'digits' ammounts of digits, throws message if not
export function verifyNumber(val, digits, errorMessage) {
  let regex = new RegExp(`\\b\\d{${digits}}\\b`);
  if(!regex.test(val))
    throw errorMessage;
}

// Verify a date without year in the form DD/MM. throws error if not
export function verifyDateWithoutYear(val, errorMessage) {
  let regex = new RegExp(`\\b\\d{2}/\\d{2}\\b`);
  if(!regex.test(val))
    throw errorMessage;
}

// Clamp a string to a given size
export function clampString(str, maxSize) {
  if (maxSize + 3 > str.length) {
    return str;
  } else {
    return `${str.substr(0, maxSize)}...`;
  }
}

// Return an array of 'size' related books samples from arr to book
export async function getRelatedBooks(book, arr, size) {
  let bookScores = [];

  // assign scores to each books
  for (let curIndex in arr) {
    const curBook = arr[curIndex];
    // ignores given book
    if (curBook.id === book.id) {
      continue;
    }
    let categories = Object.entries(curBook);
    let score = categories.reduce((pv, cv) => ( pv + (book[cv[0]] === cv[1] ? 1 : 0)), 0 ).toFixed(2);
    
    let curScores = [score, curIndex];

    bookScores.push(curScores);
  }

  // sort from largest to smallest
  bookScores.sort((a, b) => {
    return b[0] - a[0];
  });

  // choose first size elements
  const chosen = bookScores.slice(0, Math.min(size, bookScores.length));
  return chosen.map((el) => arr[el[1]]);
}

// Fetch from database
export async function fetchBook(id){
  const res = await fetch(`http://localhost:5000/books/${id}`);
  const data = await res.json();
  return data;
}

export async function fetchBooksByIds(ids) {
  let data = [];
  for (var i = 0; i < ids.length; i++) {
    const res = await fetch(`http://localhost:5000/books/${ids[i]}`);
    const book = await res.json();
    data.push(book);
  }
  return data;
}

// Fetch from database
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

// Fetch from database
export async function fetchUsers(){
  const res = await fetch(`http://localhost:5000/users`);
  const data = await res.json();
  return data;
}

export async function fetchUserbyEmail(email){
  // TODO treat error
  const res = await fetch(`http://localhost:5000/users/?email=${email}`);
  const data = await res.json();
  return data;
}