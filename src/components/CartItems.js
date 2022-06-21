import { clampString } from '../utils';

const CartItems = ({ books, cartArray, setBooks, addToCart, removeFromCart }) => {
  const images = require.context('../../public/images', true);

  return (
    <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QUANTITY</th>
              <th>SUB TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Each book is a row */}
            {
              books.map((book, index) => (
                cartArray[index] && <tr key={book.id}>
                  <td>
                    <div className='book-container'>
                      <img alt="Book Cover" src={images(`./${book.img}`)} width="70px"/>
                    </div>
                    <p className='cart-item'>{clampString(book.title, 15)} - {clampString(book.author, 15)}</p>
                  </td>
                  <td>
                    {cartArray[index][1]}
                    <button className='qtd-control plus' onClick={() => addToCart(book.id, 1)}>+</button>
                    <button className='qtd-control minus' onClick={() => removeFromCart(book.id, 1)}>-</button>
                  </td>
                  <td>$ {(cartArray[index][1] * book.price).toFixed(2)}</td>
                </tr>
                
              ))
            }
          </tbody>
        </table>
  )
}

export default CartItems