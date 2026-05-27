import { useEffect, useState } from "react";
import '../css/ProductCard.css';
import { data } from "react-router-dom";
import { API_URL } from '../config/api';
// import data from '/data/products.json';

// 1. Komponenti për një Produkt të vetëm (për të izoluar sasinë)
function SingleProduct({ product, onAddtoCart }) {
    const [quantityNr, setQuantityNr] = useState(1);

    const increment = () => {
        if (quantityNr < product.quantity) {
            setQuantityNr(prev => prev + 1);
        } else {
            alert(`${product.title} is out of stock (Max: ${product.quantity})`);
        }
    };

    const decrement = () => {
        if (quantityNr > 1) {
            setQuantityNr(prev => prev - 1);
        }
    };

    const isOutofStock = product.quantity === 0;

    return (
        <div className="product-card">
            <div className="product-details">
                <img src={product.imgPath} width={200} height={200} alt={product.title} />
                <div className="product-card-details">
                    <p className="product-title">{product.title}</p>
                    <p className="details">{product.details}</p>
                    <p className="price">{product.price} $</p>
                    <p className="product-category">{product.category}</p>
                    <div className="quantity-details" style={{border: isOutofStock ? 'none' : ''}}> 
                        {!isOutofStock ? 
                        (<>
                        <button className="increment-quantity" onClick={increment}>+</button>
                        <p className="quantity">{quantityNr}</p>
                        <button className="decrement-quantity" onClick={decrement}>-</button></>) : (    
                                <p style={{color: 'orangered', fontStyle: 'italic', fontSize: '12px'}}>Out of stock</p>                            
                            
                        )}
                    </div>
                </div>
            </div>
            <button className="add-to-cart" 
                onClick={() => onAddtoCart(product, quantityNr)}
                disabled={isOutofStock}
                style={{
                    backgroundColor: isOutofStock ? '#ccc' : '',
                    cursor: isOutofStock ? 'not-allowed' : 'pointer',
                    opacity: isOutofStock ? 0.6 : 1}}>
                {isOutofStock ? "Add to Cart" : "Add to cart"}
            </button>
        </div>
    );
}


function ProductCard({ onAddtoCart, selectedCategory, searchFilter }) {
    const [products, setProducts] = useState([]);
    const [load, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "https://raw.githubusercontent.com/leotrimhamiti/e-commerce-app-products/main/products.json";

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Couldn't fetch data");
            const res = await response.json();
            setProducts(res.products);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (load) return <p style={{fontFamily: 'Arial'}}>Loading products...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const term = searchFilter ? searchFilter.toLowerCase() : "";

        const matchesProduct =
            (product.title?.toLowerCase() || "").includes(term) ||
            (product.details?.toLowerCase() || "").includes(term) ||
            (product.category?.toLowerCase() || "").includes(term);

        return matchesCategory && matchesProduct;
    });

    return (
        <div className="products-container"> 
            {filteredProducts.length === 0 ? (
                <p style={{ color: 'red', fontFamily: 'Arial', fontSize: 20 }}>
                    No products match your search.
                </p>
            ) : (
                filteredProducts.map((product) => (
                    <SingleProduct 
                        key={product.id} 
                        product={product} 
                        onAddtoCart={onAddtoCart} 
                    />
                ))
            )}
        </div>
    );
}

export default ProductCard;