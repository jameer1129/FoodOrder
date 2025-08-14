import Button from './UI/Button'
import { useContext } from 'react';
import CartContext from "../store/CartContext";

export default function MealItem({meal}) {
   const cartCtx = useContext(CartContext)
   function handleAddMealToCart() {
      cartCtx.addItem(meal)
   }
   function handleRemoveToCart() {
      cartCtx.removeItem(meal.id)
   }
   const mealQuntityIndex = cartCtx.items.find(item => item.id === meal.id)
   let mealQuntity=0
   if(mealQuntityIndex) {
      mealQuntity = mealQuntityIndex.quantity
   }
   return <li className="meal-item">
      <article>
         <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
         <div>
               <h3>{meal.name}</h3>
               <p className="meal-item-price">$ {meal.price}</p>
               <p className="meal-item-description">{meal.description}</p>
               <div>
                  {mealQuntity===0 ?
                     <p className="meal-item-actions">
                        <Button onClick={handleAddMealToCart}>Add Cart</Button>
                     </p> :
                     (<p className="cart-item-actions-onMeal">
                        <button onClick={handleRemoveToCart}>-</button>
                        <span>{mealQuntity}</span>
                        <button onClick={handleAddMealToCart}>+</button>
                     </p>)
                  }
               </div>
         </div>
      </article>
   </li>
}