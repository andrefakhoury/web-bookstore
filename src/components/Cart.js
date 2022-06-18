import BookCard from "./BookCard"

const Cart = ({cartItems}) => {
  console.log(cartItems);
  return (
    <div>
      <h1>Cart</h1>
      {
        Object.entries(cartItems).map((bookInfo) => (
          <p key={bookInfo[0]}>ID: {bookInfo[0]} - QTT: {bookInfo[1]}</p>
        ))
      }

    </div>
  )
}

export default Cart