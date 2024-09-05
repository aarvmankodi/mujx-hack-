// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();



  const handleNavigation = (location) => {
    navigate(`/${location}`);
  };
  return (
    
    <div className="sidebar">
      
        <div className='item' onClick={() => handleNavigation('')}>DashBoard </div>
        <div className='item' onClick={() => handleNavigation('physicalFactory')}>Physical Factory</div>
        <div className='item' onClick={() => handleNavigation('return')}>Returns</div>
        <div className='item' onClick={() => handleNavigation('tags')}>Tags</div>
        <div className='item'>Log Out</div>
      
    </div>


    
  );
};

export default Sidebar;
