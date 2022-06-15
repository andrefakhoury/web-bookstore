const Book = ({book}) => {
  if (!book) {
    return <>Invalid book given</>
  }

  const images = require.context('../../public/images', true);
  let imageSource = images("./book_cover.png");
  try {
    imageSource = images(`./${book.img}`);
  } catch(e) {}

  return (
    <div>
      <h1>Book details</h1>
      <div className="full-center">
        <div className="book-info">
          <img alt="aa" className="book-cover" src={imageSource}/>
          <div className="book-inner">
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book