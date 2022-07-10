import BookCard from "./BookCard"
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchBooks, mapAllCategories } from "../utils"

const Books = () => {
  let navigate = useNavigate();
  const [books, setBooks] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get('genre')

  // Map given genre -> Title to show
  const mapGenre = useRef({
    "": "Trending now",
    "all": "Trending now",
    ...mapAllCategories
  });

  // Get current genre and load books accordingly
  useEffect(() => {
    if (!(genre in mapGenre.current)) {
      setSearchParams({'genre':'all'})
      navigate({pathname: "/home", search:"genre=all"}, {replace: true});
    }

    const getBooks = async () => {
      const booksFromServer = await fetchBooks(genre);
      setBooks(booksFromServer)
    }
    getBooks()
  }, [genre, navigate, setSearchParams, mapGenre])

  return (
    <div className="center">
      <h1>{mapGenre.current[genre]}</h1>
      <div className="bookshelf">
      {
        books.map((book) => (
          <BookCard key={book._id} book={book}/>
        ))
      }
      </div>
    </div>
  )
}

Books.defaultProps = {
  title: 'Trending now',
}

export default Books