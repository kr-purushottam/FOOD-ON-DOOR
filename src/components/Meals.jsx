import { useEffect, useState } from "react";
import MealCard from "./MealCard";

export default function Meals() {
    const[loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeal() {
            try{
                const response = await fetch("http://localhost:3000/meals");
                if(!response.ok) {
                    throw new Error(response.status + " " + response.text);
                }
                const mealsData = await response.json();
                setLoadedMeals(mealsData);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchMeal();
    },[])
    
    return(
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <li key={meal.id}><MealCard meal={meal}/></li>
            )) }
        </ul>
    )
}