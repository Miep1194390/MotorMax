import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hoewerkthet from './components/Hoewerkthet.jsx';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx'
import Feed from './components/Feed.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hoewerkthet" element={<Hoewerkthet />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
