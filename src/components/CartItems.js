import { clampString } from '../utils';

const CartItems = ({ books, cartArray }) => {
  const images = require.context('../../public/images', true);

  return (
    <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Cada livro é um tr */}
            {
              books.map((book, index) => (
                <tr key={book.id}>
                  <td>
                    <div className='book-container'>
                      <img alt="Book Cover" src={images(`./${book.img}`)} width="70px"/>
                    </div>
                    <p className='cart'>{clampString(book.title, 15)} - {clampString(book.author, 15)}</p>
                  </td>
                  <td>{cartArray[index][1]}</td>
                  <td>$ {cartArray[index][1] * book.price}</td>
                </tr>
                
              ))
            }
          </tbody>
        </table>
  )
}

export default CartItems