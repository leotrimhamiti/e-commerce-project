import { useState } from 'react';
import '../css/Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './Login';

function Cart({ cart, setCartItem, loggedIn, setLoggedIn, setNotification}) {
    const items = cart || [];
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    if(!loggedIn) {
        return <Navigate to='/login'/>
    }

    const totalPrice = items.reduce((acc, item) => acc + parseFloat(item.price), 0);

    const removeFromCart = (indexToRemove) => {
        const updatedCart = items.filter((_, index) => index !== indexToRemove);
        setCartItem(updatedCart); 
        if (user) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
        }
    };

  const confirmedOrder = (e) => {
    // 1. Gjejmë vlerat e inputeve (mund të përdorësh state për secilën ose querySelector)
    const inputs = document.querySelectorAll('.pay-input');
    let allFilled = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
            input.style.border = "1px solid red"; // Markoje fushën që mungon
        } else {
            input.style.border = "1px solid #ccc";
        }
    });

    if (!allFilled) {
        setNotification("⚠️ Please fill in all shipping details");
        setTimeout(() => setNotification(""), 3000);
        return; // NDALON FUNKSIONIN KETU
    }

    // NËSE ÇDO GJË ËSHTË OK, VAZHDON KODI POSHTË
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
                    {/* NESE KLIKOJMË CHECKOUT, SHFAQIM PAGESËN, PËRDRYSHE SHPORTËN */}
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
                                    <input type="radio" name="pay" id="card" defaultChecked />
                                    <label htmlFor="card"> 💳 Credit Card</label>
                                </div>
                                <div className="payment-option">
                                    <input type="radio" name="pay" id="paypal" />
                                    <label htmlFor="paypal"> 🅿️ PayPal</label>
                                </div>
                                <div className="payment-option">
                                    <input type="radio" name="pay" id="cash" />
                                    <label htmlFor="cash"> 💵 Cash on Delivery</label>
                                </div>
                            </div>
                            
                            <form id='checkout-form' type='submit'>
                                <h3>Shipping Address</h3>
                                <input required type="text" placeholder="Full Name" className="pay-input" />
                                <input required type="text" placeholder="Street Address" className="pay-input" />
                                <input required type="text" placeholder="City" className="pay-input"/>
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