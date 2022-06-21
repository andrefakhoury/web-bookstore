import { fetchBooksByIds, clampString } from "../utils"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CartItems from "./CartItems"

const Cart = ({cartItems, cartObjects, addToCart, removeFromCart}) => {
  let navigate = useNavigate();
  
  const cartArray = Object.entries(cartItems)
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    setBooks(cartObjects);
  }, [cartObjects]);

  return (
    <div>
      <h2 className="cart-title">Cart</h2>
      <div className="cart">
        {
          books.length > 0 ?
          <>
            <CartItems
              books={books} cartArray={cartArray} setBooks={setBooks} addToCart={addToCart} removeFromCart={removeFromCart}
              showQuantityButtons={true}
            />
            <p>FINAL PRICE: $ {
              books.reduce((pv, v, index) => (
                pv + (cartArray[index] ? v.price*cartArray[index][1] : 0)), 0
              ).toFixed(2)
            }</p>
            <button className="btn" onClick={() => navigate({pathname: "/checkout"})}>Proceed to Checkout</button>
          </>
           : <>The cart is empty...</>
        }
      </div>
    </div>
  )
}

export default Cart