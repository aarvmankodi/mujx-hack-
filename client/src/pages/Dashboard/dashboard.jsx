import React, { useState } from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { PieChart, Pie as RechartsPie, Cell, Label } from 'recharts';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState('User Id');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleNavigation = (path) => {
    {
     navigate(path);
   }
 };

  const handleSearch = (e) => {
    e.preventDefault();
    // onSearch(query); // Call the search function from the parent component
  };

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

  // Define chart data based on selection
  const getChartData = () => {
    if (selection === 'Category') {
      return {
        labels: ["Electronics", "Clothing", "Home", "Books", "Toys", "Sports"],
        datasets: [
          {
            label: 'Luxury',
            data: [50, 30, 40, 20, 10, 35],
            backgroundColor: 'red',
          },
          {
            label: 'Super',
            data: [30, 40, 25, 35, 20, 30],
            backgroundColor: 'blue',
          },
          {
            label: 'Basic',
            data: [20, 30, 35, 45, 70, 35],
            backgroundColor: 'green',
          },
        ],
      };
    } else {
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: 'Luxury',
            data: [20, 40, 10, 30, 5, 7, 15, 20, 30, 60, 55, 35],
            backgroundColor: 'red',
          },
          {
            label: 'Super',
            data: [10, 30, 20, 15, 8, 12, 5, 25, 20, 40, 30, 20],
            backgroundColor: 'blue',
          },
          {
            label: 'Basic',
            data: [5, 10, 15, 20, 5, 8, 12, 18, 25, 30, 35, 10],
            backgroundColor: 'green',
          },
        ],
      };
    }
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const Frequencydata = {
    labels: ['Kept', 'Returned'],
    datasets: [
      {
        label: 'returned frequency',
        data: [10, 15],
        backgroundColor: ['blue', 'red'],
        hoverBackgroundColor: ['blue', 'red'],
      },
    ],
  };

  // Gauge chart data and color function
  const inventoryFillPercentage = 75; // This should be dynamically set based on your actual inventory data
  const gaugeData = [
    { name: 'Filled', value: inventoryFillPercentage },
    { name: 'Empty', value: 100 - inventoryFillPercentage }
  ];

  const getColor = (percent) => {
    if (percent <= 50) return '#00C49F'; // Green
    if (percent <= 75) return '#FFA500'; // Yellow
    return '#FF0000'; // Red
  };

  const gaugeColor = getColor(inventoryFillPercentage);

  return (
    <div className='dashboard'>
      <div className='topBar'>
        <div className='name'>Amazon Admin Centralized Dashboard</div>
        <div className='user-select'>
          Selection
          <select value={selection} onChange={handleSelectionChange}>
            <option value="User Id">User Id</option>
            <option value="Product Id">Product Id</option>
            <option value="Category">Category</option>
          </select>
        </div>
        <div className='searchId'>
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-item" onClick={() => handleNavigation("/purchases")} style={{ display: 'flex', alignItems: 'center' }}>
          {selection === 'Product Id' ? (
            <div style={{ textAlign: 'center', width: '100%' }}>nil</div>
          ) : (
            <>
              <div className='graph-bar' style={{ width: '80%' }}>
                <Bar data={getChartData()} options={options} />
              </div>
              <table style={{ width: '15%', textAlign: 'left', marginLeft: '45%' }}>
                <tbody>
                  <tr>
                    <td>Luxury</td>
                    <td>{'>70k'}</td>
                  </tr>
                  <tr>
                    <td>Super</td>
                    <td>{'40k-70k'}</td>
                  </tr>
                  <tr>
                    <td>Basic</td>
                    <td>{'0-40k'}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="grid-item" onClick={() => handleNavigation("/return")} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Pie className="pie" data={Frequencydata} />
        </div>

        <div className="grid-item" onClick={() => handleNavigation("/physicalFactory")} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {selection !== 'User Id' ? (
            <>
              <h3>Inventory Space Utilization</h3>
              <PieChart width={200} height={200}>
                <RechartsPie
                  data={gaugeData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={180}
                  endAngle={0}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill={gaugeColor} />
                  <Cell fill="#FFFFFF" />
                  <Label
                    value={`${inventoryFillPercentage}%`}
                    position="center"
                    fill="#FFFFFF"
                    style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                    }}
                  />
                </RechartsPie>
              </PieChart>
            </>
          ) : (
            <div>nil</div>
          )}
        </div>

        <div className="grid-item" onClick={() => handleNavigation("/tags")} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {selection === 'User Id' ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
            }}>
              <div style={{
                marginBottom: '10px',
                fontWeight: 'bold',
                fontSize: '1.2em',
              }}>
                Current Tag
              </div>
              <div class="circle1"></div>
            </div>
          ) : (
            <div>nil</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
