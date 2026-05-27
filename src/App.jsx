import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(() => {
  return !!localStorage.getItem('accessToken');
   });
  const [notification, setNotification] = useState("");

  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? `cart_${user.email}` : null;
  };

  const onAddtoCart = (product, quantityToAdd) => {
    setCart((prevCart) => {
        const isItemInCart = prevCart.find((item) => item.id === product.id);

        if (isItemInCart) {
            return prevCart.map((item) =>
                item.id === product.id
                    ? { ...item, cartQuantity: item.cartQuantity + quantityToAdd }
                    : item
            );
        }
        return [...prevCart, { ...product, cartQuantity: quantityToAdd }];
    });
    alert(`U shtuan ${quantityToAdd} njësi në shportë!`);

    if(product.quantity = 0) {
      alert(`${product.title}Product out of stock, sorry`)
      return;
    }
};

 useEffect(() => {
  const token = localStorage.getItem('accessToken');

  setLoggedIn(!!token);

  if (token) {
    const userKey = getCartKey();

    const savedCart =
      JSON.parse(localStorage.getItem(userKey)) || [];

    setCartItems(savedCart);
  } else {
    setCartItems([]);
  }

}, []);

const addToCart = (product, quantityToAdd) => {
  if (!loggedIn) {
    setNotification("⚠️ Please log in to add items to your cart");
    setTimeout(() => setNotification(""), 2000);
    return;
  }



  const userKey = getCartKey();
  if (!userKey) return;

  setCartItems((prevCart) => {
    let updatedCart;
    

    const existingItem = prevCart.find((item) => item.id === product.id);

    if (existingItem) {
      updatedCart = prevCart.map((item) =>
        item.id === product.id
          ? { ...item, cartQuantity: (item.cartQuantity || 0) + quantityToAdd }
          : item
      );
    } else {
     
      updatedCart = [...prevCart, { ...product, cartQuantity: quantityToAdd }];
    }

    
    localStorage.setItem(userKey, JSON.stringify(updatedCart));
    return updatedCart;
  });

  setNotification(`✅ Added ${quantityToAdd} x ${product.title} to cart!`);
  setTimeout(() => setNotification(""), 2000);
};

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchFilter(""); 
  };

  const handleSearchChange = (term) => {
    setSearchFilter(term);
    setSelectedCategory("All"); 
  };

  return (
    <BrowserRouter>
    <div className='app-container'>
      {notification && (
        <div className="custom-notification">
          {notification}
        </div>
      )}

     <Navbar 
  // Llogarit totalin e të gjitha sasive në shportë
  cartCount={cartItems.reduce((acc, item) => acc + (item.cartQuantity || 0), 0)} 
  onCategoryChange={handleCategoryChange} 
  onSearchChange={handleSearchChange}
  loggedIn={loggedIn}
  setLoggedIn={setLoggedIn}
/>
      <main>
      <Routes>
        <Route 
          path='/' 
          element={
            <Home 
              onAddtoCart={addToCart} 
              selectedCategory={selectedCategory} 
              searchFilter={searchFilter}
            />
          } 
        />
        
        <Route 
          path="/cart" 
          element={
            <Cart loggedIn={loggedIn} setLoggedIn={setLoggedIn}
              cart={cartItems}  
              setCartItem={setCartItems} 
              setNotification={setNotification}
            />
          } 
        />
        
        <Route path='/login'
         element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/signup' element={<Signup loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </main>
      <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App;