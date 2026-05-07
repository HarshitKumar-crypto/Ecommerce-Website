import { Route, Routes } from 'react-router'
import axios from 'axios'
import { HomePage } from './Pages/home/HomePage'
import { CheckoutPage } from './Pages/checkout/CheckoutPage'
import { OrdersPage } from './Pages/orders/OrdersPage'
import { TrackingPage } from './Pages/TrackingPage'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const[cart, setCart] = useState([]);
  const loadCart = async() =>{
    const response = await axios.get('/api/cart-items?expand=product');
        setCart(response.data);
  };
  
  useEffect(()=>{
    loadCart();
  },[]);


  return (
    <Routes>
      <Route index element={<HomePage cart = {cart} loadCart = {loadCart} />} />
      <Route path='checkout' element={<CheckoutPage cart = { cart } loadCart = {loadCart} />} />
      <Route path='orders' element={<OrdersPage cart = { cart } loadCart={loadCart}/>} />
      <Route path='tracking' element={<TrackingPage />} />
    </Routes>
  )
}

export default App
