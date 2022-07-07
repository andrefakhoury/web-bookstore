import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'

const CartItems = ({ books, cartArray, setBooks, addToCart, removeFromCart, showQuantityButtons }) => {
  const images = require.context('../../public/images', true);

  return <div className="container">
    <div className="row font-weight-bold">
      <div className="col-sm-1"></div> {/* Cover photo */}
      <div className="col">ITEM</div>
      <div className="col-sm-2">QUANTITY</div>
      <div className="col-sm-3">SUB TOTAL</div>
    </div>
    {
      books.map((book, index) => (
        cartArray[index] && <div key={book.id} className="row border border-light align-items-center">
          {/* Item cover && title */}
          <div className="col-sm-1">
            <img alt="Book Cover" src={images(`./${book.img}`)} width="100%"/>
          </div>

          <div className="col">
            <span className='cart-item'>{book.title} - {book.author}</span>
          </div>

          {/* Quantity */}
          <div className="col-sm-2">
            {cartArray[index][1]}
            {
              showQuantityButtons === true &&
              <div>
                {
                  cartArray[index][1] !== 1 ?
                    <FaMinus style={{cursor: "pointer"}} size={12} onClick={() => removeFromCart(book.id, 1)}/>
                  : <FaTrash style={{cursor: "pointer"}} size={12} onClick={() => removeFromCart(book.id, 1)}/>
                }
                <FaPlus style={{cursor: "pointer"}} size={12} onClick={() => addToCart(book.id, 1)}/>
              </div>
            }
          </div>

          {/* Price */}
          <div className="col-sm-3">${(cartArray[index][1] * book.price).toFixed(2)}</div>
        </div>
      ))

    }
  </div>
}

export default CartItems