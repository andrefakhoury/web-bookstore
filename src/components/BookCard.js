import { Link } from 'react-router-dom';

const BookCard = ({book}) => {
  const images = require.context('../../public/images', true);
  
  return (
    <div className="gallery">
      <Link to={{pathname: "/book", search: `${book.id}`}}>
        <img alt="Book Cover" src={images(`./${book.img}`)}/>
        <div className="desc">{book.title}<br/>{book.author}<br/><br/><b>${book.price}</b></div>
      </Link>
    </div>
  )
}

export default BookCard