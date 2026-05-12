import '../css/Footer.css';

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        

        
        <div className="footer-content">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book.</p>
        <p>{year} - E-Commerce App - All Rights Reserved</p>
        </div>
        
    )
} export default Footer;