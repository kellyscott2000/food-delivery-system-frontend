import { assets } from '../../assets/assets';
import './Footer.css';


const Footer = () => {
    const currentYear = new Date().getFullYear();


  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Delicious meals, delivered fast. Thank you for choosing us!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.instagram_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>ChopExpress</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>0502345670</li>
                    <li>chopexpress@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright {currentYear} @ ChopExpress.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer