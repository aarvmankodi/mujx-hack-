import React , {useState} from 'react';
import './purchases.css'; 
import { Pie , Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Purchases = () => {


  const data = {
    labels: ['over 1,00,000', '5,000-40,000', '40,000-70,000'],  // Labels for each slice
    datasets: [
      {
        label: 'prices',
        data: [6, 4, 2],  // Data values for each slice
        backgroundColor: ['orange', 'red', 'blue'],  // Slice colors
        hoverBackgroundColor: ['orange', 'red', 'blue'],  // Hover colors
      },
    ],
  };

  

  
    const graphdata1 = {
      labels: ["Luxury" , "Risky" , "Basic"], // X-axis labels
      datasets: [
        {
          label: `Monthly sales`, // Label for the dataset
          data: [6,4,2], // Data points for the line graph
          borderColor: '#36A2EB', // Line color
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Background color (under the line)
          fill: true, // Fill the area under the line
        },
      ],
    };

    const graphdata2 = {
      labels: ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" ,"Aug", "Sep" , "Oct" , "Nov" , "Dec"], // X-axis labels
      datasets: [
        {
          label: `Monthly average sales`, // Label for the dataset
          data: [20 , 40 , 10 , 30 , 5 , 7 , 15 , 20 , 30 , 60 , 55 , 35], // Data points for the line graph
          borderColor: '#36A2EB', // Line color
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Background color (under the line)
          fill: true, // Fill the area under the line
        },
      ],
    };
  


  const [selectedValue, setSelectedValue] = useState('month');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

  };

  return (
    
    <div className="purchases">
        <div className='top-purchases'>
            <p className='purchase-para'>Products purchased on : 
            
            <select className='dropdowns-purchases' value={selectedValue} onChange={handleChange}>
            <option value="month">month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
            </select></p>
            <div className='month-select'>{selectedValue} : </div>
            <div class='charts'>
            
            <div className='pie'><Pie data={data} /></div>
            <div className='graph'><Line data={graphdata1} /></div>
            </div>
           
        </div>

        <div className='bottom-purchases'>
            <div className='graph'><Line data={graphdata2} /></div>
        </div>
        
      
    </div>


    
  );
};

export default Purchases ;
