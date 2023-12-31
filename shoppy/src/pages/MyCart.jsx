import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';

const SHIPPING = 3000;
export default function MyCart() {
  const { uid } = useAuthContext();
  const {isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

  if(isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice = 
    products && 
    products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 
    0
  );
  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>My Cart</p>
      {!hasProducts && <p>No Items in your cart</p>}
      {hasProducts && <>
        <ul className='border-b border-gray-300 mb-8 p-4'>
          {products && products.map((product) => (
            <CartItem key={product.id} product={product} uid={uid} />
          ))}
        </ul>
        <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
          <PriceCard text='total item price' price={totalPrice} />
          <BsFillPlusCircleFill className='shrink-0' />
          <PriceCard text='delievery fee' price={SHIPPING} />
          <FaEquals className='shrink-0' />
          <PriceCard text='total price' price={totalPrice + SHIPPING} />
        </div>
        <Button text='Order' />
      </>}
    </section>
  );
}
