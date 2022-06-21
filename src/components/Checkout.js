import { fetchBooksByIds } from "../utils"
import FormField from "./FormField"
import { useState, useEffect } from 'react'
import CartItems from "./CartItems"
import { useNavigate } from 'react-router-dom'


const Checkout = ({cartItems}) => {
    let navigate = useNavigate();

    const cartArray = Object.entries(cartItems)
    const [books, setBooks] = useState([])
    useEffect(() => {
        const getBooks = async () => {
        const ids = Array.from( cartArray.map((bookInfo) => (bookInfo[0])));
        const booksFromServer = await fetchBooksByIds(ids);
        setBooks(booksFromServer)
        }
        getBooks()
    }, [cartArray])
    // States for each field
    const [creditCard, setCreditCard] = useState("");
    const [exp, setExp] = useState("");
    const [cvc, setCVC] = useState("");
    const [holderName, setHolderName] = useState("");

    const onSubmit = () =>{
        alert("Compra bem sucedida! Espero que esse não seja o seu cartão de verdade")
        // onCheckout(cartItems)
        navigate("/")
    }

    return (
        <div>
        <h2 className="cart-title">Checkout</h2>
        <div className="cart">
                <CartItems books={books} cartArray={cartArray}/>
                <p>FINAL PRICE: $ {books.reduce((pv, v, index) => (pv + v.price*cartArray[index][1]), 0).toFixed(2)}</p>
        </div>
        <form onSubmit={onSubmit}>
                <FormField label="Credit Card Number" value={creditCard} isRequired={true} setText={setCreditCard}/>
                <FormField label="Exp. Date" value={exp} isRequired={true} setText={setExp}/>
                <FormField label="CVC" value={cvc} isRequired={true} setText={setCVC}/>
                <FormField label="Cardholder Name" value={holderName} isRequired={true} setText={setHolderName}/>
                <input type="submit" value="Confirm Order"/>
            </form>
        </div>
    )
}

export default Checkout