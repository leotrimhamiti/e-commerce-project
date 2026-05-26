import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import { useState, useEffect } from 'react';
import storeChartLogo from '../logos/store-chart.jpg';
import searchLogo from '../logos/search.webp';

function Navbar({ onCategoryChange, onSearchChange, cartCount, loggedIn, setLoggedIn }) {
    const categoriesList = ["All", "Electronics", "Home Decor", "Shoes", "Accessories", "Apparel"];

    const [categories, setCategories] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [placeholder, setPlaceholder] = useState("Search for products or categories");
    const [isFocused, setIsFocused] = useState(false);
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    // Load user
    useEffect(() => {
        if (loggedIn) {
            const data = JSON.parse(localStorage.getItem('currentUser'));
            setUserData(data);
        } else {
            setUserData(null);
        }
    }, [loggedIn]);

    // Responsive placeholder
    useEffect(() => {
        const updatePlaceholder = () => {
            setPlaceholder(window.innerWidth <= 630
                ? "Search"
                : "Search for products or categories"
            );
        };

        updatePlaceholder();
        window.addEventListener("resize", updatePlaceholder);
        return () => window.removeEventListener("resize", updatePlaceholder);
    }, []);

    const handleCategories = () => {
        setCategories(prev => !prev);
    };

    const handleSearch = () => {
        if (!searchInput.trim()) return;

        onSearchChange(searchInput);
        navigate('/');
        setSearchInput("");
        setIsFocused(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        setLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className='navbar'>

            {/* LOGO */}
            <div
                className='navbar-logo'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    onCategoryChange("All");
                    navigate("/");
                }}
            >
                <p>E-Commerce</p>
            </div>

            {/* CATEGORIES */}
            <div className='categories-links'>
                <button className='categories' onClick={handleCategories}>
                    Categories
                </button>

                {categories && (
                    <ul className="categories-dropdown">
                        {categoriesList.map((cat) => (
                            <li
                                key={cat}
                                onClick={() => {
                                    onCategoryChange(cat);
                                    setCategories(false);
                                    setSearchInput("");
                                    navigate("/");
                                }}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* SEARCH */}
            <div className={`search-form ${isFocused ? 'focused' : ''}`}>
                <input
                    type='text'
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        // safer for iPhone Safari
                        setTimeout(() => setIsFocused(false), 150);
                    }}
                />

                <button
                    className='search-btn'
                    onClick={handleSearch}
                >
                    <p>Search</p>
                    <img
                        className='search-logo'
                        src={searchLogo}
                        width={20}
                        alt="search"
                    />
                </button>
            </div>

            {/* AUTH SECTION */}
            {loggedIn ? (
                <div className="profile-container">
                    <span className="user-name">
                        {userData?.username || 'User'}&nbsp;▼
                    </span>

                    <div className="profile-dropdown-content">
                        <Link to="/cart">My Cart</Link>
                        <button
                            onClick={handleLogout}
                            className="logout-action-btn"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className='navbar-links'>
                    <Link className="join-link" to="/login">
                        <button className='login-btn'>Log in</button>
                    </Link>

                    <Link className='join-link' to="/signup">
                        <button className='signup-btn'>Sign up</button>
                    </Link>

                    <Link className="join-link" to="/login">
                        <button className='join-btn'>JOIN</button>
                    </Link>
                </div>
            )}

            {/* CART */}
            {loggedIn && (
                <div className='store-chart-log-in'>
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <button className='chart-btn'>
                            <img src={storeChartLogo} width={20} alt="cart" />
                            <span className="cart-count">{cartCount}</span>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;