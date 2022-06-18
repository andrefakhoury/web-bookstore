import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Book from "./components/Book";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import { fetchBooks, fetchUser } from './utils';
import Cart from './components/Cart';

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser(2);
      setLoggedUser(user);
    }
    getUser();
  }, [])

  const updateProfile = async (id, newUser) => {
    const oldUser = await fetchUser(id);
    const updatedUser = {
      ...oldUser,
      userName: newUser.userName,
      address: newUser.address,
      password: newUser.password,
      phone: newUser.phone      
    };
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedUser)
    });
    const data = await res.json();
    setLoggedUser(data);
  }

  const addToCart = (bookId, qtt) => {
    let oldAmmount = cartItems[bookId];
    if (!oldAmmount) oldAmmount = 0;
    cartItems[bookId] = oldAmmount + qtt;
    setCartItems(cartItems);
  };
  
  return (
    <Router>
      <div id="App">
        <div id="content-wrap">
          <Header/>
          <Routes>
            {/* Default path is /home?all */}
            <Route path="/" element={<Navigate to={{pathname: "/home", search: "all"}}/>}/>
            <Route path='/home' element={<Books/>}/>
            <Route path='/book' element={<Book onAddToCart={addToCart}/>}/>
            <Route path='/cart' element={<Cart cartItems={cartItems}/>}/>
            {/* If logged in, goest o user page. Otherwise, goes to login */}
            <Route path='/user' element={<UserProfile user={loggedUser} onUpdate={updateProfile}/>}/>
          </Routes>
        </div>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
