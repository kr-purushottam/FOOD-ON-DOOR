import { useContext } from "react"
import CartContext from "../../context/CartContext"
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";
import  UserProgressContext  from "../../context/UserProgressContext";
import Modal from "./Modal";
import { MdAlternateEmail } from "react-icons/md";
import CartItems from "./CartItems";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressctx = useContext(UserProgressContext);

    const totalCartValue =  cartCtx.items.reduce(
        (totalValue, item) => totalValue + item.quantity * item.price,
    0);

    function handleHideCart() {
        userProgressctx.hideCart();
    }

    return(
        <Modal className="cart" open={userProgressctx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <CartItems 
                        key={item.key}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                    />
                ))}
            </ul>
            <p className="cart-total">Total Amount : {currencyFormatter.format(totalCartValue)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleHideCart}>Go Back</Button>
                <Button>CheckOut</Button>
            </p>
            
        </Modal>
    )
}   