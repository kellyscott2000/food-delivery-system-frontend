import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate('/category')
  }

  return (
    <div className="header">
        <div className="header-content">
            <h2>Get Food Fast, Without the Hassle.</h2>
            <p>Find the meals you love, place your order, and enjoy! With seamless delivery and pick-up options, dining has never been this convenient. Your next great meal is just moments away.</p>
            <button onClick={handleView}>View Menu</button>
        </div>
    </div>
  )
}

export default Header