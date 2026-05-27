import { useState } from 'react';
import '../css/Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import  masterCard  from '../logos/mastercard.png';
import visaCard from '../logos/visa.png';

function Cart({ cart, setCartItem, loggedIn, setNotification }) {
    const items = cart || [];
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    
    // Ruajmë numrin e kartës për të dalluar llojin (Visa/MasterCard)
    const [cardNumber, setCardNumber] = useState('');
    
    const navigate = useNavigate();

    if (!loggedIn) {
        return <Navigate to='/login' />
    } 

    const totalPrice = items.reduce((acc, item) => {
        const qty = item.cartQuantity || 1;
        return acc + (parseFloat(item.price) * qty);
    }, 0);

    const removeFromCart = (indexToRemove) => {
        const updatedCart = items.filter((_, index) => index !== indexToRemove);
        setCartItem(updatedCart); 
        if (user) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
        }
    };

   
    const isVisa = cardNumber.startsWith('4');
    const isMasterCard = cardNumber.startsWith('5');
    const isUnknown = cardNumber.length > 0 && !isVisa && !isMasterCard;

    const confirmedOrder = (e) => {
        const inputs = document.querySelectorAll('.pay-input');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.border = "1px solid red"; 
            } else {
                input.style.border = "1px solid #ccc";
            }
        });

        if (!allFilled) {
            setNotification("⚠️ Please fill in all required details");
            setTimeout(() => setNotification(""), 3000);
            return; 
        }

        setCartItem([]);
        if (user) localStorage.removeItem(`cart_${user.email}`);
        
        setNotification("✅ Your orders have been confirmed successfully");
        setTimeout(() => setNotification(""), 3000);
        navigate('/');
    };

    return (
        <div className="cart-container">
            {items.length === 0 ? (
                <div className="empty-cart">
                    <h1>Your cart is empty, go to <Link to='/'>Shop</Link></h1>
                </div>
            ) : (
                <div className='cart-cont'>
                    {!isCheckingOut ? (
                        <div className="cart-left-column">
                            <h2 className="cart-title">Your Shopping Cart ({items.length} items)</h2>
                            <div className="cart-details">
                                {items.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <img src={item.imgPath} alt={item.title} width={80} />
                                        <div className="item-info">
                                            <p><strong>{item.title}</strong></p>
                                            <p>{item.price} $</p>
                                            <p className="item-qty-display">
                                                Quantity: <strong>{item.cartQuantity || 1}</strong>
                                            </p>
                                            <p className="item-subtotal">
                                                Subtotal: {((item.cartQuantity || 1) * parseFloat(item.price)).toFixed(2)} $
                                            </p>
                                        </div>
                                        <button className='remove-btn' onClick={() => removeFromCart(index)}>
                                            Remove
                                        </button>
                                    </div>
                                ))}          
                            </div>
                        </div>
                    ) : (
                        <div className="payment-methods">
                            <h2>Select Payment Method</h2>
                            <div className="payment-grid">
                                <div className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="pay" 
                                        id="card" 
                                        checked={paymentMethod === 'card'} 
                                        onChange={() => setPaymentMethod('card')} 
                                    />
                                    <label htmlFor="card"> 💳 Credit Card</label>
                                </div>
                                <div className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="pay" 
                                        id="paypal" 
                                        checked={paymentMethod === 'paypal'} 
                                        onChange={() => setPaymentMethod('paypal')} 
                                    />
                                    <label htmlFor="paypal"> 🅿️ PayPal</label>
                                </div>
                                <div className="payment-option">
                                    <input 
                                        type="radio" 
                                        name="pay" 
                                        id="cash" 
                                        checked={paymentMethod === 'cash'} 
                                        onChange={() => setPaymentMethod('cash')} 
                                    />
                                    <label htmlFor="cash"> 💵 Cash on Delivery</label>
                                </div>
                            </div>
                            
                            <form id='checkout-form' onSubmit={(e) => e.preventDefault()}>
                                <h3>Shipping Address</h3>
                                <input required type="text" placeholder="Full Name" className="pay-input" />
                                <input required type="text" placeholder="Street Address" className="pay-input" />
                                <input required type="text" placeholder="City" className="pay-input"/>

                                
                                {paymentMethod === 'card' && (
                                    <div className="card-details-fields" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                                        
                                        <div className="card-logos-container" style={{ marginBottom: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '14px', color: '#666' }}>Card Type:</span>
                                            
                                           
                                            <img 
                                                src={visaCard} className='cart-photo'
                                                alt="Visa" 
                                                style={{ 
                                                    height: '20px', 
                                                    width: 'auto',
                                                    transition: 'all 0.3s ease',
                                                    opacity: isMasterCard || isUnknown ? 0.2 : 1,
                                                    transform: isVisa ? 'scale(1.1)' : 'scale(1)'
                                                }} 
                                            />
                                            
                                            
                                            <img className='card-photo'
                                                src={masterCard}
                                                alt="MasterCard" 
                                                style={{ 
                                                    height: '20px', 
                                                    width: 'auto',
                                                    transition: 'all 0.3s ease',
                                                    opacity: isVisa || isUnknown ? 0.2 : 1,
                                                    transform: isMasterCard ? 'scale(1.1)' : 'scale(1)'
                                                }} 
                                            />
                                        </div>

                                        <h3>Enter Card Information</h3>
                                        
                                        <input required type="text" placeholder="Cardholder Name" className="pay-input" />
                                        
                                        <input 
                                            required 
                                            type="text" 
                                            maxLength="16" 
                                            placeholder="Card Number (16 digits)" 
                                            className="pay-input" 
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                                        />
                                        
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input required type="text" maxLength="5" placeholder="MM/YY" className="pay-input" style={{ flex: 1 }} />
                                            <input required type="password" maxLength="3" placeholder="CVV" className="pay-input" style={{ flex: 1 }} />
                                        </div>
                                    </div>
                                )}
                            </form>

                            <button className="back-btn" onClick={() => setIsCheckingOut(false)}>
                                ← Back to Cart
                            </button>
                        </div>
                    )}
                </div>
            )}

            {items.length > 0 && (
                <div className="cart-summary-bottom">
                    <div className="summary-content">
                        <h3>Total: {totalPrice.toFixed(2)} $</h3>
                        {!isCheckingOut ? (
                            <button className="checkout-btn" onClick={() => setIsCheckingOut(true)}>
                                Checkout Now
                            </button>
                        ) : (
                            <button className="confirm-order-btn" onClick={confirmedOrder}>
                                Confirm Order
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;