import logo from '../assets/logo.jpg'
export default function NavBar() {
    return(
        <div id="main-header">
            <div id="title">
                <img src={logo}/>
                <h2>FOOD-ON-DOOR</h2>
            </div>
            <nav><button>Cart(0)</button></nav>
        </div>
    )
}