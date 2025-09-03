// App.js
import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from 'framer-motion';
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
import PageWrapper from './Animations/Animation';
// import Loader from "./components/Loader";
function App() {
  const location = useLocation();

  return (
    <PageWrapper variant="slideFromRight">
      <>
        <Routes location={location} key={location.pathname}>
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
        /></>
    </PageWrapper>
  );
}

export default App;
