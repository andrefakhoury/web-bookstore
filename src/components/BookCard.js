import { useState } from 'react'

const BookCard = ({book}) => {
  const images = require.context('../../public/images', true);
  
  return (
    <div className="gallery">
      <a href="#">
        <img alt="Book Cover" src={images(`./${book.img}`)}/>
        <div className="desc">{book.title}<br/>{book.author}<br/><br/><b>${book.price}</b></div>
      </a>
    </div>
  )
}

export default BookCard