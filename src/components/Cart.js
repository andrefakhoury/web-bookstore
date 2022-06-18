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

  
  console.log(books)

  return (
    <div>
      <h1>Cart</h1>
      <div className="full-center">
      {
        books.map((book) => (
          <BookCard key={book.id} book={book}/>
        ))
      }
      </div>

    </div>
  )
}

export default Cart