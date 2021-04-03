import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import { UserStorage } from './Contexts/UserContext';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import NotFound from './Components/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
            <Routes>
              <ProtectedRoute path="/*" element={<Home />} />
              <ProtectedRoute path="conta/*" element={<AdminPanel />} />
              <Route path="login/*" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
