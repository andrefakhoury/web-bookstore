import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchBook, fetchBooks, getRelatedBooks } from "../utils";
import BookCard from "./BookCard";

const Book = ({onAddToCart}) => {
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
      setRelatedBooks(await getRelatedBooks(bookFromServer, allBooksFromServer, 5));
    }
    getBook()
  }, [bookId, navigate])

  const onClick = (e) => {
    onAddToCart(bookId, 1);
    alert("Successfully added!");
    navigate("/cart");
  }

  const images = require.context('../../public/images', true);
  let imageSource = images("./book_cover.png");
  try {
    imageSource = images(`./${book.img}`);
  } catch(e) {}

  return (
    <div className="center">
      <h1>{book.title}</h1>

      {/* Book details */}
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-auto">
            <div className="card" style={{width: "18rem", borderWidth: "0"}}>
              <img alt="Book cover" className="card-img-top" src={imageSource}/>
              <div className="card-body justify-content-center">
                <h5 className="book-price">${book.price}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="book-info" style={{width: "18rem"}}>
              <h2>{book.author}</h2>
              <h3>{book.category}</h3>
              <p>{book.description}</p>
              <button type="button"
                style={{position: "absolute",width: "100%"}} className="btn btn-primary btn-lg"
                onClick={onClick}
              >Add to cart</button>
            </div>
          </div>
        </div>        
      </div>

      {/* Related books */}
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