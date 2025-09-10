import { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../context/CartContext'
import { TbShoppingCartShare } from "react-icons/tb";




export default function NavBar() {
    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems += item.quantity;
    },0)

    return(
        <div id="main-header">
            <div id="title">
                <img src={logo}/>
                <h2>FOOD-ON-DOOR</h2>
            </div>
            <nav>
                <Button textOnly={true} className="flex-center">
                    <TbShoppingCartShare style={{ width: '40px', height: '40px' }}/> Cart ({totalCartItems})
                </Button></nav>
        </div>
    )
}