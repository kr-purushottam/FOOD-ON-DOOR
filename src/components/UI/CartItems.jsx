import { useContext } from "react"
import CartContext from "../../context/CartContext"

export default function CartItems({ name, quantity, price, onIncrease, onDescrease}) {
    const cartCtx = useContext(CartContext);

    return(
        <li className="cart-item">
            <p>{name} - {quantity} X {price}</p>
            <p className="cart-item-actions">
                <button onClick={onDescrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>

    )
}