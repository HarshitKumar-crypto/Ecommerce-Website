import axios from 'axios';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import './Homepage.css';
import { ProductsGrid } from './productsGrid';


export function HomePage( { cart , loadCart }) {
  const[products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get('/api/products')
    .then((response)=>{
      setProducts(response.data);
    });
  },[])
    

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={ products } loadCart={ loadCart }/>
      </div>
    </>
  );
}