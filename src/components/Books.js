import BookCard from "./BookCard"

const Books = ({title}) => {
  return (
    <div className="center">
      <h1>{title}</h1>
      <div className="full-center">
      <BookCard/>
      <BookCard/>
      <BookCard/>
      <BookCard/>
      <BookCard/>
      <BookCard/>
      <BookCard/>
      </div>
    </div>
  )
}

Books.defaultProps = {
  title: 'Trending now',
}

export default Books