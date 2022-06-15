import { useState, useEffect } from 'react'
import Book from "./components/Book";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {
  const [books, setBooks] = useState([]);
  const [loggedUser, setLoggedUser] = useState({
    id: 1,
    userName: 'admin',
    address: 'Mock Street',
    email: 'admin@gmail.com',
    password: 'admin',
    phone: '+551140028922',
    admin: true
  });

  useEffect(() => {
    let samples = []
    for (let i = 1; i <= 20; i++) {
      samples.push({
        id: i,
        title: `Sample Book ${i}`,
        author: `Author ${i}`,
        description: `Lorem ipsum ${i}`,
        category: 'manga',
        qttStock: i+5,
        qttSold: i+1,
        price: `${i}.99`,
        img: 'book_cover.png'
      })
    }
    setBooks(samples)
  }, []);
  
  return (
    <div id="App">
      <div id="content-wrap">
        <Header/>
        {/* <Books books={books}/> */}
        {/* <Book book={books[0]}/> */}
        <UserProfile user={loggedUser}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
