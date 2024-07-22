import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const cartItem = {
      ...item,
      moviename: item.title // Ensure the backend field is correctly named
    };
    setCartItems([...cartItems, cartItem]);
  };

  const updateCartItem = (itemId, updates) => {
    setCartItems(cartItems.map(item => item.id === itemId ? { ...item, ...updates } : item));
  };
  
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
