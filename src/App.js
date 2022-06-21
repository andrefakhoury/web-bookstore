import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect, useNavigate } from 'react'
import Book from "./components/Book";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile"
import UpdateBookInfo from './components/UpdateBookInfo';
import { fetchUser, fetchBook } from './utils';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPage from './components/AdminPage';


function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [cartItems, setCartItems] = useState(new Map());

  // Get cart items from local storage on startup
  useEffect(() => {
    const data = window.localStorage.getItem("LOCAL_CART_ITEMS");
    let dataInfo = JSON.parse(data) ?? new Map();
    setCartItems(dataInfo);
  }, []);

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

  const updateBook = async (id, newBook) => {
    const oldBook = await fetchBook(id);
    const updatedBook = {
      ...oldBook,
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      category: newBook.category,
      price: newBook.price
    };
    const res = await fetch(`http://localhost:5000/books/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedBook)
    });
    const data = await res.json();
  }

    
  const createProfile = async (newUser) => {
    const res = await fetch(`http://localhost:5000/users/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    });
    const data = await res.json();
    setLoggedUser(data);
  }

  const addToCart = (bookId, qtt) => {
    let oldAmmount = cartItems[bookId];
    if (!oldAmmount) oldAmmount = 0;
    cartItems[bookId] = oldAmmount + qtt;
    setCartItems(cartItems);

    // Save cart items from local storage
    window.localStorage.setItem("LOCAL_CART_ITEMS", JSON.stringify(cartItems));
  };

  const clearCart = () =>{
    setCartItems([])
    // Save cart items from local storage
    window.localStorage.setItem("LOCAL_CART_ITEMS", JSON.stringify(cartItems));
  }
  
  return (
    <Router>
      <div id="App">
        <div id="content-wrap">
          <Header/>
          <Routes>
            {/* Default path is /home?all */}
            <Route path="/" element={<Navigate to={{pathname: "/home", search: "genre=all"}}/>}/>
            <Route path='/home' element={<Books/>}/>
            <Route path='/book' element={<Book onAddToCart={addToCart}/>}/>
            <Route path='/cart' element={<Cart cartItems={cartItems}/>}/>
            <Route path='/checkout' element={<Checkout cartItems={cartItems} onCheckout={clearCart}/>}/>
            {/* If logged in, goes to user page. Otherwise, goes to login */}
            <Route path='/user' element={<UserProfile user={loggedUser} onUpdate={updateProfile}/>}/>
            <Route path='/users/update' element={<UpdateUserProfile loggedUser={loggedUser} onUpdate={updateProfile}/>}/>
            <Route path='/books/update' element={<UpdateBookInfo loggedUser={loggedUser} onUpdate={updateBook}/>}/>
            <Route path='/signup' element={<SignUp onAdd={createProfile}/>}/>
            <Route path='/login' element={<Login logUser={setLoggedUser}/>}/>
            <Route path='/admin' element={<AdminPage loggedUser={loggedUser}/>}/>
          </Routes>
        </div>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
