import { useContext } from "react"
import CartContext from "../context/CartContext"
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../context/UserProgressContext";
import Modal from "./UI/Modal";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartValue = cartCtx.items.reduce(
        (totalValue, item) => totalValue + item.quantity * item.price 
        ,0
    );

    function handleCloseCheckOut() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch("https://food-on-door-q4ja.onrender.com/orders", {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                order : {
                    items: cartCtx.items ,
                    customer: customerData
                }
            })
        })
    }

    return(
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleCloseCheckOut}>
            <form onSubmit={handleSubmit}>
                <h2>CheckOut</h2>
                <p>Total Amount : {currencyFormatter.format(totalCartValue)}</p>
                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-mail Id" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                <p className="modal-actions">
                    <Button textOnly type="button" onClick={handleCloseCheckOut}>Close</Button>  
                    <Button>Submit Order</Button>  
                </p>
            </form>
        </Modal>
    )
}