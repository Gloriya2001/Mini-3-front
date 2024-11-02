import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an icon
import axios from 'axios';


const Payment = () => {
  const { orderId} = useParams()
  const [paymentMethod, setPaymentMethod] = useState(''); // State to track payment method
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track if the order is placed

  const validateCardNumber = (number) => {
    const regex = /^[0-9]{16}$/; // 16 digits
    return regex.test(number);
  };
  const updateOrderStatus = (orderId, status) => {
    const msg = { orderId,status }; // Create the message object with the status

    // Make the PUT request
    axios.put(`http://localhost:8080/orderStatusPay/${orderId}`, msg)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "updated") {
          alert(`ORDER ${status.toUpperCase()}`);
        } else {
          alert("ERROR");
        }
      })
      .catch((error) => {
        console.error("Error saving order status:", error);
        alert("Error: " + (error.response ? error.response.data.message : error.message));
      });
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
    const [month, year] = date.split('/').map(Number);
    const currentDate = new Date();
    const expiryDate = new Date(2000 + year, month - 1); // Convert to Date object
    return regex.test(date) && expiryDate > currentDate; // Check format and if not expired
  };

  const validateCVV = (cvv) => {
    const regex = /^[0-9]{3,4}$/; // 3 or 4 digits
    return regex.test(cvv);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error message
    setError('');

    // Validation checks for online payment
    if (paymentMethod === 'online') {
      if (!validateCardNumber(cardNumber)) {
        setError('Invalid card number. It should be 16 digits.');
        return;
      }

      if (!validateExpiryDate(expiryDate)) {
        setError('Invalid expiry date. Please enter in MM/YY format and ensure it is not expired.');
        return;
      }

      if (!validateCVV(cvv)) {
        setError('Invalid CVV. It should be 3 or 4 digits.');
        return;
      }

      if (!nameOnCard) {
        setError('Please enter the name on the card.');
        return;
      }

      // Here you can handle the payment processing logic
      console.log('Payment Details:', { cardNumber, expiryDate, cvv, nameOnCard });
      setOrderPlaced(true); // Set order placed to true
    } else if (paymentMethod === 'cash') {
      setOrderPlaced(true); // Set order placed to true
    }
  };

  const confirmOrder = () => {
    setOrderPlaced(true); // Confirm the order
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Payment Method</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            id="online"
            name="paymentMethod"
            value="online"
            checked={paymentMethod === 'online'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Online Payment
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>
      {paymentMethod === 'online' && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="nameOnCard">Name on Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button style={{ width: '120px', height: '40px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">
              Pay Now
            </button>
          </div>
        </form>
      )}
      {paymentMethod === 'cash' && (
        <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
          <p>Please confirm your order to proceed with Cash on Delivery.</p>
          <button
            style={{
              width: '120px',
              height: '40px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => {
              confirmOrder(); // Call confirmOrder
              updateOrderStatus( orderId ,"Cash On Delivery"); // Call updateOrderStatus with the desired status
            }}
          >
            Confirm Order
          </button>
        </div>
      )}
      {orderPlaced && (

        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: '#4CAF50', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, color: '#fff', textAlign: 'center', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', transition: 'opacity 0.5s ease-in-out' }}>
          <div>
            <FaCheckCircle size={50} style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Congratulations!
            </h2>
            <p style={{ fontSize: '1.5rem' }}>
              Your order has been confirmed!
            </p>
            <Link to="/pending">
              <p style={{ fontSize: '1.5rem', color: 'blue', textDecoration: 'underline' }}>
                Back to My Orders
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;