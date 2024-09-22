import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, deleteItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onDeleteFromCart }) => {
  const [totalCost, setTotalCost] = useState(0);
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let cost = 0;
    cart.map(item => {
      const priceNumber = Number(item.cost.replace(/[^0-9.-]+/g, ''));
      cost += priceNumber * item.quantity});
    setTotalCost(cost);
  };
  useEffect(() =>{
    calculateTotalAmount();
  }, [cart]);

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeItem(item));
    const updatedItem = cart.filter(cardItem => cardItem === item);
    console.log(updatedItem[0].quantity);
    if (updatedItem[0].quantity === 1)
      onDeleteFromCart(item);
  };

  const handleRemove = (item) => {
    dispatch(deleteItem(item));
    onDeleteFromCart(item);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const priceNumber = Number(item.cost.replace(/[^0-9.-]+/g, ''));
    return priceNumber * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalCost}</h2>
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


