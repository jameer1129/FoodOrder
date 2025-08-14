import Modal from "./UI/Modal"
import CartContext from "../store/CartContext"
import { useContext, useActionState } from "react"
import Input from "./UI/Input"
import Button from "./UI/Button"
import UserProgressContext from "../store/UserProgressContext"
import useHttp from "../Hook/usehttp"
import Error from "./Error";

const config = {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' }
}
export default function Checkout() {
   const cartCtx = useContext(CartContext)
   const userProgressCtx = useContext(UserProgressContext)
   const {
      data,
      error,
      cleardata,
      sendRequest} = useHttp('http://localhost:3000/orders',config)
   const cartTotal= cartCtx.items.reduce((totalPrice,item) => {
      return totalPrice + item.quantity * item.price 
   },0)
   function handleClose(){
      userProgressCtx.hideCheckout()
   }
   async function checkoutAction(prevState,fd) {
      const customerData = Object.fromEntries(fd.entries())
      await sendRequest (JSON.stringify({
         order: {
            items:cartCtx.items,
            customer:customerData
         }
      }))
   }
   const [formState,formAction,pending] = useActionState(checkoutAction,null)
   function handleFinish() {
      userProgressCtx.hideCheckout()
      cartCtx.clearCart()
      cleardata()
   }
   let actions= (
      <>
         <Button type="button" textOnly onClick={handleClose}>Close</Button>
         <Button>Submit Order</Button>
      </>
   )
   if(pending) {
      actions = <span>Sendind order data...</span>
   }
   if(data && !error) {
      return (
         <Modal open={userProgressCtx.progress ==='checkout'} onClose={handleClose}>
            <h2>Succes!</h2>
            <p>Your order was submitted successfully</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
               <Button onClick={handleFinish}>Okay</Button>
            </p>
         </Modal>
      )
   }
   return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
         <form action={formAction}>
               <h2>Chechout</h2>
               <p>Total Amount: ${cartTotal}</p>
               <Input lable="Full Name" id="name" type="text" />
               <Input lable="E-Mail Address" id="email" type="email"/>
               <Input lable="Street" id="street" type="text" />
               <div className="control-row">
                  <Input lable="Postal Code" id="postal-code" type="text" />
                  <Input lable="City" id="city" type="text" />
               </div>
               {error && <Error title="Failed to submit order" message={error}/>}
               <p className="modal-actions">{actions}</p>
         </form>
      </Modal>
   )
}