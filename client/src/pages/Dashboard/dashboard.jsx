import React from 'react';
import './dashboard.css';

const Dashboard = () => {
return (
    <div className='dashboard'>
       <p className='heading'> DASHBOARD <br/> </p>

       <p style={{ fontSize: '25px' , paddingLeft : '45%'}}>Select User</p>



       <table className='dashboard-table' border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Badge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anom</td>
            <td>anom@gmail.com</td>
            <td>1234567890</td>
            <td>Luxury Badge</td>
          </tr>
          <tr>
            <td>Megha</td>
            <td>meg@gmail.com</td>
            <td>0987654321</td>
            <td>Risky Badge</td>
          </tr>
          <tr>
            <td>Subham</td>
            <td>sub123@gmail.com</td>
            <td>9472906273</td>
            <td>Verified Badge</td>
          </tr>
          </tbody>
          </table>


    </div>
)
      
};
  
  export default Dashboard ;
  