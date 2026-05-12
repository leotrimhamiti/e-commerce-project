import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import '../css/Home.css';


function Home({onAddtoCart, selectedCategory, searchFilter, loggedIn, showLoginWarning}) {
    
    return (
        <>
       <h1>Effortless Style <br /> <span>For Every Occasion.</span></h1>
       {showLoginWarning && !loggedIn && (
                <p className="need-to-login">
                    ⚠️ You need to log in to buy in our store
                </p>
            )}
        <div className="products-content">
            <ProductCard onAddtoCart={onAddtoCart} selectedCategory={selectedCategory} 
            searchFilter={searchFilter}/>
        </div>
        
        </>
    )
} export default Home;