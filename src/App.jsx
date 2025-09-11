import Meals from "./components/Meals";
import NavBar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";
import Modal from "./components/UI/Modal";
import { useState } from "react";
import { UserProgressContextProvider } from "./context/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/CheckOut";

function App() {
  return (
    <UserProgressContextProvider>
      <CartProvider>
        <div>
          <NavBar/>
          <Meals/>
          <Cart/>
          <Checkout/>
        </div>
      </CartProvider>
    </UserProgressContextProvider>
    
  );

  // const [open, setOpen] = useState(false);

  // return (
  //   <div>
  //     <h1>Normal React app</h1>
  //     <button onClick={() => setOpen(true)}>Open Modal</button>

  //     {/* Portal lives outside but still works with React state */}
  //     <Modal open={open} onClose={() => setOpen(false)}>
  //       <h2>Hello from Portal!</h2>
  //       <p>I’m rendered directly under document.body.</p>
  //     </Modal>
  //   </div>
  // );
}

export default App;
