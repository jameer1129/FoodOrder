import MealItem from "./mealItem";
import useHttp from "../Hook/usehttp";
import Error from "./Error";
const config = {}
export default function Meals() {
   const {
      data:loadedMeals,
      isLoading,
      error
    } = useHttp('http://localhost:3000/meals',config,[])
   if(isLoading) {
      return <p className="center">Fetching meals...</p>
   }
   if(error) {
      return <Error title="Faild to fetch meals" message={error}/>
   }
   return <ul id="meals">
      {loadedMeals.map(meal=>(
         <MealItem key={meal.id} meal={meal}/>
      ))}
   </ul>
}