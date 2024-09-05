import React from 'react';
import './return.css'; 
import { Pie , Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
const Return = () => {

  const graphdata = {
    labels: ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" ,"Aug", "Sep" , "Oct" , "Nov" , "Dec"], // X-axis labels
    datasets: [
      {
        label: `Monthly average return rate`, // Label for the dataset
        data: [2 , 4 , 1 , 3 , 5 , 7 , 1 , 10 , 0 , 0 , 5 , 7], // Data points for the line graph
        borderColor: '#36A2EB', // Line color
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Background color (under the line)
        fill: true, // Fill the area under the line
      },
    ],
  };

  const data = {
    labels: ['New', 'Once returned', 'Twice returned' , 'Thrice returned'],  // Labels for each slice
    datasets: [
      {
        label: 'prices',
        data: [6, 4, 2 , 1],  // Data values for each slice
        backgroundColor: ['orange', 'green', 'blue' , 'red'],  // Slice colors
        hoverBackgroundColor: ['orange', 'green', 'blue' , 'red'],  // Hover colors
      },
    ],
  };

  return (
    
    <div className="return">
      <div className='graph-ret'>Rate of returned items (Monthly)<Line data={graphdata} /></div>
      <div className='pie-ret '>Type of returned product<Pie data={data} /></div>
      <p className='return-pol'>
      Per return policy:<br/>
        1st return:<br/>
        70% cashback+rest credits<br/>
        2nd return:<br/>
        40% cashback + rest credits<br/>
        3rd return:<br/>
        20% cashback + rest credits<br/>    
      </p>
        
    </div>


    
  );
};

export default Return ;
