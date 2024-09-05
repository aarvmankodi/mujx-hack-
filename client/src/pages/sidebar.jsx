// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    
    <div className="sidebar">
      
        <div className='item'><a href='\'>Home</a> </div>
        <div className='item'><a href = "\interactions">Interactions</a></div>
        <div className='item'>Returns</div>
        <div className='item'>Log Out</div>
      
    </div>


    
  );
};

export default Sidebar;
