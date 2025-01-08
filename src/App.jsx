import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboard from "./pages/Admin/Dashboard";
import UserHome from "./pages/User/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
