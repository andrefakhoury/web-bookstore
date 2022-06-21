import BookCard from "./BookCard"
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchBooks } from "../utils"

const Books = () => {
  let navigate = useNavigate();
  const [books, setBooks] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get('genre')
  const mapGenre = useRef({
    "": "Trending now",
    "all": "Trending now",
    "biography": "Biography",
    "classics": "Classics",
    "comics": "Comics & Mangas",
    "fantasy": "Fantasy & Sci-Fi",
    "humor": "Humor",
    "romance": "Romance"
  })

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

Books.defaultProps = {
  title: 'Trending now',
}

export default Books