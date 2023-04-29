import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hoewerkthet from './components/Hoewerkthet.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<App />} />
          <Route path="/hoewerkthet" element={<Hoewerkthet />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
