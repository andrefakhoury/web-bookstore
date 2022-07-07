import { fetchBooksByIds, verifyDateWithoutYear, verifyEqual, verifyNotEmpty, verifyNumber } from "../utils"
import FormField from "./FormField"
import { useState, useEffect } from 'react'
import CartItems from "./CartItems"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"


const Checkout = ({cartItems, cartObjects, onSubmitCheckout}) => {
  let navigate = useNavigate();

  const cartArray = Object.entries(cartItems)
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(cartObjects);
  }, [cartObjects]);

  // States for each field
  const [creditCard, setCreditCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCVC] = useState("");
  const [holderName, setHolderName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await Swal.fire({
        title: "Are you sure?",
        text: "Once your order is confirmed, there is no turning back!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          verifyNotEmpty(creditCard, "Please provide your credit card number!");
          verifyDateWithoutYear(exp, "Please provide a valid expiration date!");
          verifyNumber(cvc, 3, "Please provide a valid CVC!");
          verifyNotEmpty(holderName, "Please provide a valid cardholder name!");
          verifyEqual(await onSubmitCheckout(), true, "This book is no longer available...");
          
          await Swal.fire({
            title: 'Your order has been confirmed!',
            footer: `I hope this is not your real credit card information...`,
            icon: 'success'
          });
          navigate("/");
        }
      });
    } catch(e) {
      await Swal.fire({
        title: 'Oops...',
        text: e,
        icon: 'error'
      });
    }
  }

  return (
    <div>
      <h2 className="cart-title">Checkout</h2>
      <div className="cart">
        <CartItems books={books} cartArray={cartArray}/>
        <p>FINAL PRICE: $ {
              books.reduce((pv, v, index) => (
                pv + (cartArray[index] ? v.price*cartArray[index][1] : 0)), 0
              ).toFixed(2)
            }</p>
      </div>
      <div className="container">
        <form onSubmit={onSubmit}>
          <FormField label="Credit Card Number" value={creditCard} isRequired={true} setText={setCreditCard}/>
          <FormField label="Exp. Date" value={exp} isRequired={true} setText={setExp}/>
          <FormField label="CVC" value={cvc} isRequired={true} setText={setCVC}/>
          <FormField label="Cardholder Name" value={holderName} isRequired={true} setText={setHolderName}/>
          <input type="submit" value="Confirm Order"/>
        </form>
      </div>
    </div>
  )
}

export default Checkout