import { createContext, useReducer } from "react";

const CartContext = createContext({
   items:[],
   addItem:(item) => {},
   removeItem:(item) => {},
   clearCart:() => {}
})

function cartReducer(state,action) {
   if(action.type === 'ADD_ITEM') {
      const existingCartItemIndex = state.items.findIndex(
         (item) => item.id === action.item.id
      )
      const updateItems = [...state.items]
      if(existingCartItemIndex> -1) {
         const existinItem = state.items[existingCartItemIndex]
         const updatedItem = {
            ...state.items[existingCartItemIndex],
            quantity:state.items[existingCartItemIndex].quantity + 1
         }
         updateItems[existingCartItemIndex] = updatedItem
      }
      else {
         updateItems.push({...action.item, quantity:1})
      }
      return {...state, items: updateItems}
   }
   if(action.type === 'REMOVE_ITEM') {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      )
      const existingCartItem = state.items[existingCartItemIndex]
      const updatedItems = [...state.items]
      if(existingCartItem.quantity===1) {
         updatedItems.splice(existingCartItemIndex,1)
      }
      else {
         const updatedItem = {
            ...state.items[existingCartItemIndex],
            quantity:state.items[existingCartItemIndex].quantity - 1
         } 
         updatedItems[existingCartItemIndex] = updatedItem
      }
      return {...state, items: updatedItems}
   }
   if(action.type === 'CLEAR_CART') {
      return {...state,item:[]}
   }
   return state
}

export function CartContextProvider({children}) {
   const [cart,dispatchAction] = useReducer(cartReducer,{items : []})
   function addItem(item) {
      dispatchAction({type:'ADD_ITEM', item})
   }
   function removeItem(id) {
      dispatchAction({type:'REMOVE_ITEM', id})
   }
   function clearCart() {
      dispatchAction({type:'CLEAR_CART'})
   }
   console.log(cart.items)
   return (
      <CartContext.Provider value={{ items: cart.items, addItem, removeItem ,clearCart}}>
         {children}
      </CartContext.Provider>
   );
}

export default CartContext