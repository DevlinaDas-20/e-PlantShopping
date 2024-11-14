import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, decrementItem } from './CartSlice';
import './CartItem.css';
import { retry } from '@reduxjs/toolkit/query';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  console.log('CartItem-----', cart)
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    console.log('item---', cart)
    let total_cart_amount = 0;
    cart.map((item) => {
      total_cart_amount = total_cart_amount + (Number(item['cost'].replace('$', ''))) * (item.quantity)
    })
    return total_cart_amount;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping()
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };




  const handleIncrement = (item) => {
    console.log('handleIncrement',item)
    const itemToPass = { ...item, todo: 'increment' };
    console.log('itemToPass',itemToPass)
    dispatch(updateQuantity(itemToPass));
  };

  const handleDecrement = (item) => {
    console.log('handleDecrement',item)
    const itemToPass = { ...item, todo: 'decrement' };
    console.log('itemToPass',itemToPass)
    dispatch(updateQuantity(itemToPass));  
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    console.log('calculateTotalCost-',item)
    return (Number(item['cost'].replace('$', ''))) * (item.quantity)
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


