import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationButton from "./components/notificationButton";
import Header from "./components/header";
import SalesCard from "./components/salescard";
import SaleInsertForm from "./components/insertMonthlyValue";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <main>
        <section className="sales">
          <div className="dsmeta-container">
            <Routes>
              <Route path="/" element={<SalesCard />} />
              <Route path="/add" element={<SaleInsertForm />} />
            </Routes>        
          </div>
        </section>
      </main>
    </Router>
  );
}

export default App;
