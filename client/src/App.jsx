import { useState } from 'react'
import './App.css'
import Sidebar from './pages/sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhysicalFactory from './pages/physicalFactory';
import Return from './pages/return';
import Tags from './pages/tags';
function App() {

  return (
    <Router>
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path = "/physicalFactory" element={<PhysicalFactory/>}/>
        <Route path = "/return" element={<Return/>}/>
        <Route path = "/tags" element={<Tags/>}/>

      </Routes>
    </div>

    </Router>
  )
}

export default App
