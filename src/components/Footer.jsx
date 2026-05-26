import { useState } from 'react';
import '../css/Footer.css';
import facebookLogo from '../logos/facebook.svg';
import instagramLogo from '../logos/instagram.webp';
import xLogo from '../logos/x.webp';


function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        

        
        <div className="footer-content">
            <div className='footer-first-part'>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                 It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                 essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                 Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                 including versions of Lorem Ipsum.</p>
                <div className='connect-us'>
                    <p style={{width:'150px', fontSize: '20px', color:'gray'}}>Connect with us:</p>
                    <div className='facebook'><img src={facebookLogo} width={20}></img><p>Facebook</p></div>
                    <div className='instagram'><img src={instagramLogo} width={20}></img><p>Instagram</p></div>
                    <div className='x'><img src={xLogo} width={20}></img><p>X</p></div>
                </div>
            </div>
           
        <p style={{fontStyle: 'italic', color: 'gray'}}>{year} - E-Commerce App - All Rights Reserved</p>
        </div>
        
    )
} export default Footer;