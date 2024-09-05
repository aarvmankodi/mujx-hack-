import { useState } from 'react'
import './App.css'
import Sidebar from './pages/Sidebar/sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tags from './pages/Tags/tags';
import Return from './pages/Return/return';
import PhysicalFactory from './pages/physicalFactory/physicalFactory';
import Purchases from './pages/Purchases/purchases';
import Dashboard from './pages/Dashboard/dashboard';

function App() {

  return (
    <Router>
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path = "/" element={<Dashboard/>}/>
        <Route path = "/physicalFactory" element={<PhysicalFactory/>}/>
        <Route path = "/return" element={<Return/>}/>
        <Route path = "/tags" element={<Tags/>}/>
        <Route path = "/purchases" element={<Purchases/>}/>

      </Routes>
    </div>

    </Router>
  )
}

export default App
