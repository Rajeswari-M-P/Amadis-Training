import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const RegistrationForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (values) => {
    try {
      
      const url = isRegister ? 'http://localhost:5000/register' : 'http://localhost:5000/login';
      const response = await axios.post(url, values);
      if (response.data.success) {
        message.success(isRegister ? 'Registration successful' : 'Login successful');
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      } else {
        // Handle specific error messages
        if (response.data.message === 'You are already registered') {
          message.warning('You are already registered. Please login instead.');
        } else {
          message.error(response.data.message || (isRegister ? 'Registration failed' : 'Login failed'));
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        {isRegister && (
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input name="username" value={formData.username} onChange={handleChange} />
          </Form.Item>
        )}
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password name="password" value={formData.password} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={handleToggle} style={{ width: '100%', textAlign: 'center' }}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Button>
    </div>
  );
};

export default RegistrationForm;
