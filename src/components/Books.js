import BookCard from "./BookCard"

const Books = ({title, books}) => {
  return (
    <div className="center">
      <h1>{title}</h1>
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