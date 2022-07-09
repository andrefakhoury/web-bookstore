import { Link } from 'react-router-dom';
import { clampString } from '../utils';

const BookCard = ({book}) => {
  const images = require.context('../../public/images', true);
  
  return (
    <div className="gallery">
      <Link to={{pathname: "/book", search: `${book.id}`}}>
        <img alt="Book Cover" src={images(`./${book.img}`)}/>
        <div className="desc">
          {clampString(book.title, 14)}<br/>
          {clampString(book.author, 14)}<br/><br/>
          <b>${book.price}</b>
        </div>
      </Link>
    </div>
  )
}

export default BookCard