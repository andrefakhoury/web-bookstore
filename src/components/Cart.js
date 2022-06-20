import { fetchBooksByIds, clampString } from "../utils"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CartItems from "./CartItems"

const Cart = ({cartItems}) => {
  let navigate = useNavigate();
  // const [books, setBooks] = useState([])
  // useEffect(() => {
  //   const getBook = async (bookInfo) => {
  //     const book = await fetchBook(bookInfo);
  //     setBooks(book)
  //   }
  //   Object.entries(cartItems).map(getBook())
  // }, [cartItems])
  // cartItems = getBooks
  const cartArray = Object.entries(cartItems)
  const [books, setBooks] = useState([])
  useEffect(() => {
    const getBooks = async () => {
      const ids = Array.from( cartArray.map((bookInfo) => (bookInfo[0])));
      const booksFromServer = await fetchBooksByIds(ids);
      setBooks(booksFromServer)
    }
    getBooks()
  }, [cartItems])


  console.log(books)

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