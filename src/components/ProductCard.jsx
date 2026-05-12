import { useEffect, useState } from "react";
import '../css/ProductCard.css';
import { data } from "react-router-dom";
import { API_URL } from '../config/api';
// import data from '/data/products.json';


function ProductCard({item, addToCart, onAddtoCart, selectedCategory, searchFilter}) {
    
    

    const [products, setProducts] = useState([]);
    const [load, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    

   
   const API_URL = "https://cdn.jsdelivr.net/gh/leotrimhamiti/e-commerce-app-products/assets/data.json";

const fetchData = async () => {
  setLoading(true)
  try {
   
    const response = await fetch(API_URL); 
      if (!response.ok) throw new Error("Couldn't fetch data");
      const res = await response.json();
     setProducts(res.products); } 
     catch (error) {
    setError(error.message);} 
    finally {
    setLoading(false);
     }
    };




    useEffect(() => {
        fetchData();
        
    }, [])

    if(load) return <p>Loading products</p>
    if (error) return <p>Error: {error.message}</p>

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

       
        const term = searchFilter ? searchFilter.toLowerCase() : "";
        
        const matchesProduct = 
            (product.title?.toLowerCase() || "").includes(term) ||
            (product.details?.toLowerCase() || "").includes(term) ||
            (product.category?.toLowerCase() || "").includes(term);

        return matchesCategory && matchesProduct;
    })

    
    return (
       <>
       {filteredProducts.length === 0 ? (
                <p style={{color: 'red', fontFamily: 'Arial', fontSize: 20}}>No products match your search.</p>
            ) : (
        
        filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
                <div className="product-details">
                    
                    <img src={product.imgPath} width={200} height={200}/>
                    
                    <div className="product-card-details">
                        <p className="product-title">{product.title}</p>
                        <p className="details">{product.details}</p>
                        <p className="price">{product.price} $</p>
                        <p className="quantity">{product.quantity}</p>
                        <p className="product-category">{product.category}</p>
                    </div>
                </div>
                <button className="add-to-cart" onClick={() => onAddtoCart(product)}>Add to cart</button>
            </div>
        ))
    )}
    </>
    )
} export default ProductCard;