import { useState } from 'react'
import './App.css'
import Sidebar from './pages/sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Interactions from './pages/interactions';

function App() {

  return (
    <Router>
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path = "/interactions" element={<Interactions/>}/>
      </Routes>
    </div>

    </Router>
  )
}

export default App
