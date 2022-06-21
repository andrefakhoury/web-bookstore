import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Book from "./components/Book";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile"
import UpdateBookInfo from './components/UpdateBookInfo';
import { fetchUser, fetchBook, fetchBooksByIds } from './utils';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPage from './components/AdminPage';
import CreateBook from './components/CreateBook';


function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [cartItems, setCartItems] = useState(new Map());
  const [cartObjects, setCartObjects] = useState([]);

  // Get cart items from local storage on startup
  useEffect(() => {
    const data = window.localStorage.getItem("LOCAL_CART_ITEMS");
    let dataInfo = JSON.parse(data) ?? new Map();
    setCartItems(dataInfo);

    async function getCartObjects(ids) {
      const booksFromServer = await fetchBooksByIds(ids);
      setCartObjects(booksFromServer);
    }

    const cartArray = Object.entries(dataInfo);
    const ids = Array.from( cartArray.map((bookInfo) => (bookInfo[0])));
    getCartObjects(ids);
  }, []);

  // Get logged user from storage, if any
  useEffect(() => {
    async function getUser(userId) {
      const data = await fetchUser(userId);
      setLoggedUser(data);      
    }
    const data = window.localStorage.getItem("LOGGED_USER_INFO");
    let dataInfo = JSON.parse(data) ?? new Map();
    if (!isNaN(dataInfo.id)) {
      getUser(dataInfo.id);
    }
  }, []);

  // Fetch db to load all objects of cart items
  async function updateCartObjects() {
    const cartArray = Object.entries(cartItems);
    const ids = Array.from( cartArray.map((bookInfo) => (bookInfo[0])));
    const booksFromServer = await fetchBooksByIds(ids);
    setCartObjects(booksFromServer);
  }

  // Log an user, saving local state and storage
  const logUser = ((user) => {
    setLoggedUser(user);
    const userId = { id: user.id };
    window.localStorage.setItem("LOGGED_USER_INFO", JSON.stringify(userId));
  });

  const createProfile = async (newUser) => {
    const res = await fetch(`http://localhost:5000/users/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    });
    const data = await res.json();
    logUser(data.id);
  }

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

  const createBook = async (newBook) => {
    const res = await fetch(`http://localhost:5000/books/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newBook)
    });
    const data = await res.json();
  }

  const updateBook = async (id, newBook) => {
    const oldBook = await fetchBook(id);
    const updatedBook = {
      ...oldBook,
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      category: newBook.category,
      price: newBook.price,
      img: newBook.img
    };
    const res = await fetch(`http://localhost:5000/books/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedBook)
    });
    const data = await res.json();
  }

  // Add to cart (if in stock) and saves to local storage
  const addToCart = async (bookId, qtt) => {
    let oldAmmount = cartItems[bookId];
    if (!oldAmmount) oldAmmount = 0;
    const newAmmount = oldAmmount + qtt;
    
    // check if is available
    const book = await fetchBook(bookId);
    if (!book.qttStock || newAmmount > book.qttStock) {
      alert("Oops, this book is not available in the desired ammount");
      return false;
    }

    cartItems[bookId] = newAmmount;
    setCartItems(cartItems);
    await updateCartObjects();

    // Save cart items from local storage
    window.localStorage.setItem("LOCAL_CART_ITEMS", JSON.stringify(cartItems));
    return true;
  };

  // Remove item from cart, updating cartItems and cartObjects
  const removeFromCart = async (bookId, qtt) => {
    const oldAmmount = cartItems[bookId];
    
    if (oldAmmount <= qtt) { // remove element
      delete cartItems[bookId];
    } else { // update element
      cartItems[bookId] -= qtt;
    }

    setCartItems(cartItems);
    await updateCartObjects();

    // Save cart items from local storage
    window.localStorage.setItem("LOCAL_CART_ITEMS", JSON.stringify(cartItems));
  };

  const onSubmitCheckout = async () => {
    // Check if all items are available
    const keys = Object.entries(cartItems);
    for (let index in keys) {
      let currentId = keys[index][0];
      let currentQtt = keys[index][1];

      const currentItem = await fetchBook(currentId);
      if (currentQtt > currentItem.qttStock) {
        return false;
      }
    }

    // Update sold, qtt in stock
    for (let index in keys) {
      let currentId = keys[index][0];
      let currentQtt = keys[index][1];

      const newBook = await fetchBook(currentId);
      newBook.qttSold += currentQtt;
      newBook.qttStock -= currentQtt;
      
      await fetch(`http://localhost:5000/books/${currentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBook)
      });
    }

    // clear cart items
    setCartItems({});
    setCartObjects([]);
    window.localStorage.setItem("LOCAL_CART_ITEMS", JSON.stringify({}));
    return true;
  }

  const onLogOut = () => {
    setLoggedUser({});
    window.localStorage.setItem("LOGGED_USER_INFO", JSON.stringify({}));
  }
  
  return (
    <Router>
      <div id="App">
        <div id="content-wrap">
          <Header isAdmin={loggedUser.admin === true}/>
          <Routes>
            {/* Default path is /home?all */}
            <Route path="/" element={<Navigate to={{pathname: "/home", search: "genre=all"}}/>}/>
            <Route path='/home' element={<Books/>}/>
            <Route path='/book' element={<Book onAddToCart={addToCart}/>}/>
            <Route path='/cart' element={<Cart cartItems={cartItems} cartObjects={cartObjects} addToCart={addToCart} removeFromCart={removeFromCart}/>}/>

            {/* If logged in, goes to desired page. Otherwise, goes to login */}
            {
              <Route path='/user' element={
                loggedUser.id ?
                  <UserProfile user={loggedUser} onUpdate={updateProfile} onLogOut={onLogOut}/>
                : <Login logUser={logUser}/>
              }/>
            }
            {
              <Route path='/checkout' element={
                loggedUser.id ?
                  <Checkout cartItems={cartItems} cartObjects={cartObjects} onSubmitCheckout={onSubmitCheckout}/>
                : <Login logUser={logUser}/>
              }/>
            }
            {
              <Route path='/signup' element={
                loggedUser.id ?
                  <SignUp onAdd={createProfile}/>
                : <Login logUser={logUser}/>
              }/>
            }
            {
              <Route path='/login' element={
                loggedUser.id ?
                  <UserProfile user={loggedUser} onUpdate={updateProfile}/>
                : <Login logUser={logUser}/>
              }/>
            }

            {/* Admin-only */}
            {
              loggedUser.admin === true &&
                <Route path='/users/update' element={<UpdateUserProfile loggedUser={loggedUser} onUpdate={updateProfile}/>}/>
            }
            {
              loggedUser.admin === true &&
                <Route path='/books/create' element={<CreateBook loggedUser={loggedUser} onAdd={createBook}/>}/>
            }
            {
              loggedUser.admin === true &&
                <Route path='/books/update' element={<UpdateBookInfo loggedUser={loggedUser} onUpdate={updateBook}/>}/>
            }
            {
              loggedUser.admin === true &&
                <Route path='/admin' element={<AdminPage loggedUser={loggedUser}/>}/>
            }            
          </Routes>
        </div>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
