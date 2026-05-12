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
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState("");

  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? `cart_${user.email}` : null;
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLoggedIn(true);
      const userKey = getCartKey();
      const savedCart = JSON.parse(localStorage.getItem(userKey)) || [];
      setCartItems(savedCart);
    } else {
      setLoggedIn(false);
      setCartItems([]);
    }
  }, [loggedIn]);

  const addToCart = (product) => {
    if (!loggedIn) {
      setNotification("⚠️ Please log in to add items to your cart");
      setTimeout(() => setNotification(""), 2000);
      return;
    }

    const userKey = getCartKey();
    if (!userKey) return;

    setCartItems((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem(userKey, JSON.stringify(updatedCart));
      return updatedCart;
    });

    setNotification(`${product.title} added to your personal cart!`);

    setTimeout(() => {
      setNotification("");
    }, 2000);
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
      {/* KETU VENDOSET NJOFTIMI */}
      {notification && (
        <div className="custom-notification">
          {notification}
        </div>
      )}

      <Navbar 
        cartCount={cartItems.length} 
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