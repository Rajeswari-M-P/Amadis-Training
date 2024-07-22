import React, { useContext } from 'react';
import { List, Button, Divider, Avatar, Select } from 'antd';
import { CartContext } from './CartContext';
import axios from 'axios'; // Import axios for HTTP requests

const { Option } = Select;
const availableSeats = ['A1', 'A2', 'B3', 'B4', 'C3', 'C1']; // Define available seats here

const Cart = () => {
  const { cartItems, updateCartItem, removeFromCart } = useContext(CartContext);

  const handleShowtimeChange = (itemId, value) => {
    updateCartItem(itemId, { showtime: value });
  };

  const handleSeatsChange = (itemId, value) => {
    updateCartItem(itemId, { seats: value });
  };

  const handleCheckout = async () => {
    try {
      // Prepare data to send to server
      const checkoutData = cartItems.map(item => ({
        moviename: item.moviename,
       
        showtime: item.showtime,
        seats: item.seats.join(', '),
        totalprice: item.price
      }));
  
      // Get token from local storage or context
      const token = localStorage.getItem('jwtToken'); // Adjust as needed
  
      // Send POST request to server with token in Authorization header
      const response = await axios.post('http://localhost:5000/cartitems', checkoutData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Handle success response
      console.log('Checkout successful:', response.data);
      
      // Optionally, clear cartItems or handle navigation to success page
    } catch (error) {
      // Handle error
      console.error('Error during checkout:', error);
    }
  };
  
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cart Summary</h2>
      <Divider />
      <h3>Selected Movies</h3>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => removeFromCart(item.id)}>Remove</Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.poster} shape="square" size={64} />}
              title={item.title}
              description={
                <>
                  <div>Showtime: {item.showtime || 'Not selected'}</div>
                  <Select
                    style={{ width: 160, marginBottom: 8 }}
                    placeholder="Select Showtime"
                    onChange={(value) => handleShowtimeChange(item.id, value)}
                  >
                    <Option value="2024-07-15 18:00">2024-07-15 18:00</Option>
                    <Option value="2024-07-15 20:00">2024-07-15 20:00</Option>
                    <Option value="2024-07-15 16:00">2024-07-15 16:00</Option>
                    <Option value="2024-07-15 13:00">2024-07-15 13:00</Option>
                    <Option value="2024-07-15 10:00">2024-07-15 10:00</Option>
                    <Option value="2024-07-15 06:00">2024-07-15 06:00</Option>
                    {/* Add more options as needed */}
                  </Select>
                  <div>Seats: {item.seats ? item.seats.join(', ') : 'Not selected'}</div>
                  <Select
                    mode="multiple"
                    style={{ width: 160, marginBottom: 8 }}
                    placeholder="Select Seats"
                    value={item.seats}
                    onChange={(value) => handleSeatsChange(item.id, value)}
                  >
                    {availableSeats.map(seat => (
                      <Option key={seat} value={seat}>{seat}</Option>
                    ))}
                  </Select>
                </>
              }
            />
            <div>${item.price.toFixed(2)}</div>
          </List.Item>
        )}
      />
      <Divider />
      <p>Total Amount: ${getTotalPrice().toFixed(2)}</p>
      <Divider />
      <Button type="primary" style={{ width: '20%' }} onClick={handleCheckout}>Proceed to Checkout</Button>
    </div>
  );
};

export default Cart;
