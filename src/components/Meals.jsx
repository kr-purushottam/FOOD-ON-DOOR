import { useContext, useEffect, useState } from "react";
import MealCard from "./MealCard";
import { OrbitProgress } from "react-loading-indicators";

export default function Meals() {
    const[loadedMeals, setLoadedMeals] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchMeal() {
            setIsLoading(true);
            try{
                const response = await fetch("https://food-on-door-q4ja.onrender.com/meals");

                if(!response.ok) {
                    throw new Error(response.status + " " + response.text);
                }
                const mealsData = await response.json();
                setLoadedMeals(mealsData);
            }
            catch(err) {
                console.log(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchMeal();
    },[])
    
    return(
        <div>
            {isLoading ? <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}><OrbitProgress dense color="#ffc404" size="medium" text="" textColor="" /></div> : <ul id="meals">
            {loadedMeals.map((meal) => (
                <li key={meal.id}><MealCard meal={meal}/></li>
            )) }
        </ul>}
        </div>
        
        
    )
}