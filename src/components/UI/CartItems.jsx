import { useContext } from "react"
import CartContext from "../../context/CartContext"

export default function CartItems({name, quantity, price}) {
    const cartCtx = useContext(CartContext);

    function handleIncreaseButton() {
        cartCtx.addQuantityByOne(name)
    }

    function handleDescreaseButton() {
        cartCtx.reduceQuantityByOne(name)
    }
    return(
        <li className="cart-item">
            <p>{name} - {quantity} X {price}</p>
            <p className="cart-item-actions">
                <button onClick={handleDescreaseButton}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseButton}>+</button>
            </p>
        </li>

    )
}