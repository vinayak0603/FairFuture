import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import FormPage from "./page/form";
import AdminPage from "./page/admin/AdminPage";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";

function App() {
  return (
    <BrowserRouter>
      {/* Loader sits above everything — unmounts automatically after images load */}
      <PageLoader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
