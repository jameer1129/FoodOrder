import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext';
import { useContext } from 'react';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
   const {items} = useContext(CartContext)
   const userPrograssCtx = useContext(UserProgressContext)
   const quantity = items.reduce((total,item)=>{
      return total+item.quantity
   },0)
   function handleShowCart() {
      userPrograssCtx.showCart()
   }
   return <header id="main-header">
      <div id="title">
         <img src={logoImg} alt="Logo" />
         <h1>ReactFood</h1>
      </div>
      <nav>
         <Button textOnly onClick={handleShowCart}>Cart ({items.length})</Button>
      </nav>
   </header>
}