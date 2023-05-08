import { useDispatch, useSelector} from 'react-redux';
import { Fragment } from 'react';
import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state=>state.cart)
  const notification = useSelector(state=>state.ui.notification)
  useEffect(()=>{
    const sendCartData=async()=>{
      dispatch(uiActions.showNotification({status:'pending',title:'Sending...',message:'Sending Cart Data'}))
   const responce = await fetch('https://advance-redux-cfcfe-default-rtdb.firebaseio.com/CartData.json',{
      method:'PUT',
      body: JSON.stringify(cart)
    })
    if(!responce.ok){
throw new Error('Sending Cart Data fails')
    }

    dispatch(uiActions.showNotification({status:'Success',title:'Sucess!',message:'Sending Cart Data SuccessFully!'}))
  }
  if(isInitial){
    isInitial = false
    return ;
  }
  sendCartData().catch(err=>{
    dispatch(uiActions.showNotification({status:'Error',title:'Error',message:'Sending Cart Data Failed'}))
  })
  },[cart])

  return (
    <Fragment>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;