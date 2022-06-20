import BookCard from "./BookCard"
import { fetchBooksByIds } from "../utils"
import { useState, useEffect, useRef } from 'react'

const Cart = ({cartItems}) => {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    const getBooks = async () => {
      let ids = Array.from( Object.entries(cartItems).map((bookInfo) => (bookInfo[0])));
      const booksFromServer = await fetchBooksByIds(ids);
      setBooks(booksFromServer)
    }
    getBooks()
  }, [cartItems])

  return (
    <div>

      <h2 className="cart-title">Cart</h2>
      <div className="cart">
            <CartItems books={books} cartArray={cartArray}/>
            <p>FINAL PRICE: $ {books.reduce((pv, v, index) => (pv + v.price*cartArray[index][1]), 0).toFixed(2)}</p>
            <button className="btn" onClick={() => navigate({pathname: "/checkout"})}>Proceed to Checkout</button>
      </div>
    </div>
  )
}

export default Cart