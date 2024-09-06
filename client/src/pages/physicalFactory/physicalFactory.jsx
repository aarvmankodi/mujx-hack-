import React , {useState} from 'react';
import './physicalFactory.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PhysicalFactory = () => {
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);


  const handleChange = (event) => {
    setSelectedValue(event.target.value);

  };

 const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleNavigation = () => {
    {
     window.location.href = 'https://www.amazon.com';
   }
 };
 
  
  return (
    
    <div className="physicalFactory">
      
      <div className='user-entries'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Returns</th>
                            <th>Send</th>
                            <th>Confirmation</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            <tr className='entry'>
                                <td>HKE5432</td>
                                <td>Smart Phones</td>
                                <td>4</td>
                                <td><FontAwesomeIcon icon={faShareFromSquare} className="icon"  onClick={toggleVisibility}/></td>
                                <td>yes</td>
                            </tr>
                        
                    </tbody>
                </table>
                {isVisible && (
        <div style={{ marginTop: '10px',backgroundColor:'black' , color:"white", padding: '10px'}}>
          Upload to : 
          <button onClick={() => handleNavigation()}>Refurbished</button>
          <button onClick={() => handleNavigation()}>New</button>
              
        </div>
      )}
            </div>
      
    </div>


    
  );
};

export default PhysicalFactory;
