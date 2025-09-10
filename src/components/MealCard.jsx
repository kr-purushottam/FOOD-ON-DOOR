import CartContext from "../context/CartContext";
import { currencyFormatter} from "../util/formatting";
import Button from "./UI/Button";
import { useContext } from "react";





export default function MealCard({meal}) {
    const mealctx = useContext(CartContext)


    function handleClick() {
        mealctx.addMeal(meal);
    }

    return(
        <div className="meal-item">
            <article>
                <img src={`http://localhost:3000${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
            </article>
            <p className="meal-item-actions">
                <Button onClick={handleClick}>Add to Cart</Button>
            </p>
        </div>
    )
}