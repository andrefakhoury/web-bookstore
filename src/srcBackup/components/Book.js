import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchBook, fetchBooks, getRandomSubarray } from "../utils";
import BookCard from "./BookCard";

const Book = () => {
  let navigate = useNavigate();
  const [book, setBook] = useState({});
  const [relatedBooks, setRelatedBooks] = useState([]);
  const bookId = useLocation().search.substring(1);

  useEffect(() => {
    const getBook = async () => {
      // fetch current book
      const bookFromServer = await fetchBook(bookId);
      setBook(bookFromServer);

      if (!bookFromServer || Object.keys(bookFromServer).length === 0)
        navigate({pathname: "/"});

      // fetch related books
      const allBooksFromServer = await fetchBooks("all");
      setRelatedBooks(await getRandomSubarray(allBooksFromServer, 5));
    }
    getBook()
  }, [bookId, navigate])

  const images = require.context('../../public/images', true);
  let imageSource = images("./book_cover.png");
  try {
    imageSource = images(`./${book.img}`);
  } catch(e) {}

  return (
    <div>
      <h1>Book details</h1>
      <div className="center book-info">
        <img alt="Book cover" className="book-cover" src={imageSource}/>
        {/* <span className="book-price">${book.price}</span> */}
        <div className="book-inner">
          <h2>{book.title}</h2>
          <h3>{book.author} - {book.category}</h3>
          <p>{book.description}</p>
        </div>
      </div>
      <div id="related-books">
        <h3>Related books</h3>
        {
          relatedBooks.map((relatedBook) => (
            <BookCard key={relatedBook.id} book={relatedBook}/>
          ))
        }
      </div>
    </div>
  )
}

export default Book