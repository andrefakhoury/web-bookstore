import bookCover from "../img/book_cover.png"

const BookCard = () => {
  return (
    <div class="gallery">
      <a href="#">
        <img src={bookCover}/>
        <div class="desc">Sample Book<br/>Sample Author<br/><br/><b>$19.99</b></div>
      </a>
    </div>
  )
}

export default BookCard