import React , {useState} from 'react';
import './physicalFactory.css'; 

const PhysicalFactory = () => {

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

  };

 
  
  return (
    
    <div className="physicalFactory">
      
        <div className='top'>
            <div className='bar'>
            <select className='dropdowns' value={selectedValue} onChange={handleChange}>
        <option value="Total Inventory">Total Inventory</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>
              </div>


   
        </div>
        <div className='bottom'>
          No products found
        </div>
      
    </div>


    
  );
};

export default PhysicalFactory;
