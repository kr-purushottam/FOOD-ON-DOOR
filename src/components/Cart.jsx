import { useContext } from "react"
import CartContext from "../context/CartContext"
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import  UserProgressContext  from "../context/UserProgressContext";
import Modal from "./UI/Modal";
import CartItems from "./UI/CartItems";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressctx = useContext(UserProgressContext);

    const totalCartValue =  cartCtx.items.reduce(
        (totalValue, item) => totalValue + item.quantity * item.price,
    0);

    function handleHideCart() {
        userProgressctx.hideCart();
    }

    function handleShowCheckout() {
        userProgressctx.showCheckout();
    }

    return(
        <Modal className="cart" open={userProgressctx.progress === 'cart'} onClose={userProgressctx.progress === "checkout" || handleHideCart}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <CartItems 
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addMeal(item)}
                        onDescrease={() => cartCtx.removeMeal(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">Total Amount : {currencyFormatter.format(totalCartValue)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleHideCart}>Go Back</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleShowCheckout}>Go to CheckOut</Button>}
            </p>
        </Modal>
    )
}   