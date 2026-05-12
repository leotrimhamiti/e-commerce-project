import { Link } from "react-router-dom";
import '../css/NotFound.css'
import sadLogo from '../logos/sad.png'

function NotFound() {
    return(
        <div className="not-found-content">
            <div className="not-found-details">
            <img src={sadLogo} width={200}></img>
            <h1>404</h1>
            <h3>Oops! This page is not found</h3>
            <p>Go back <Link to='/'>Home</Link></p>
        </div>
        </div>
    )
} export default NotFound;