// App.js
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from "./pages/HomePage";
import Overview from "./pages/Overview";
import Functions from "./pages/Functions";
import History from "./pages/History";
import OurTeam from "./pages/OurTeam";
import Rules from "./pages/Rules";
import SliderAdmin from './pages/SliderAdmin';
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();  // ✅ safe to use now
  const [sliderVisible] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);
  useEffect(() => {
    AOS.refresh();
  }, [sliderVisible]);

  useEffect(() => {
    AOS.refresh(); // ✅ triggers on every route change
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/history" element={<History />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/sliders" element={<SliderAdmin />} />
      </Routes>

      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;
