import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchCartData=()=>{
  return async(dispatch)=>{
    const fetchData=async()=>{
const respence = await fetch('https://advance-redux-cfcfe-default-rtdb.firebaseio.com/CartData.json')

if(!respence.ok){
  throw new Error('could not Fetch cart Data!')
}
const data = respence.json()
return data
}
  
  try{
   const data = await fetchData()
   dispatch(cartActions.replaceCart(data))
  }catch(err){
    dispatch(uiActions.showNotification({status:'error',title:'Error',message:'Fetching Cart Data Failed'}))
  }
}

}

export const sendCartData=(cart)=>{
  return async(dispatch)=>{
   dispatch(uiActions.showNotification({status:'pending',title:'Sending...',message:'Sent Cart Data'}))
   const sentRequest =async()=>{
   const responce = await fetch('https://advance-redux-cfcfe-default-rtdb.firebaseio.com/CartData.json',{
     method:'PUT',
     body: JSON.stringify(cart)
   })
   if(!responce.ok){
throw new Error('Sending Cart Data fails')
   }
 }
 try{
 await sentRequest()
 
 dispatch(uiActions.showNotification({status:'Success',title:'Sucess!',message:'Sending Cart Data SuccessFully!'}))
 }catch(err){
   dispatch(uiActions.showNotification({status:'error',title:'Error',message:'Sent Cart Data Failed'}))
 }
 }
}