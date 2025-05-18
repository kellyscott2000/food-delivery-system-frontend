import './Category.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';
import { useEffect, useState } from 'react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.url}/api/category/get`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, [])
  
  
  const handleCategoryClick = (category) => {
    navigate(`/menu/${category}`);
  };

  return (
    <div className='category'>
      <div className='title'>
        <h1>All Menu Categories</h1>
      </div>
      <div className="category-list">
        {categories.map((item, index) => {
          return (
            <div
              onClick={() => handleCategoryClick(item.name)}
              className="explore-menu-list-item"
              key={index}
            >
              <img src={`${config.url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;

