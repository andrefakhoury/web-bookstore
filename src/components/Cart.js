import { fetchBooksByIds, clampString } from "../utils"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
  const images = require.context('../../public/images', true);

  return (
    <div>
      <h1>Cart</h1>
      <div className="full-center">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Cada livro é um tr */}
            {
              books.map((book, index) => (
                <tr key={book.id}>
                  <td>
                    <img alt="Book Cover" src={images(`./${book.img}`)} width="100px"/>
                    {clampString(book.title, 15)} - {clampString(book.author, 15)}
                  </td>
                  <td>{cartArray[index][1]}</td>
                  <td>{cartArray[index][1] * book.price}</td>
                </tr>
                
              ))
            }
          </tbody>
        </table>
            <p>FINAL PRICE: {books.reduce((pv, v, index) => (pv + v.price*cartArray[index][1]), 0).toFixed(2)}</p>
            <button className="btn" onClick={() => navigate({pathname: "/checkout"})}>Proceed to Checkout</button>
      </div>
    </div>
  )
}

export default Cart