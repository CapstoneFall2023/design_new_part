import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Kyc from "./pages/Kyc";
import UserDetails from "./pages/UserDetails";
import Approved from "./pages/Approved";
import My from "./pages/My";

// import Data from "./components/Data";
function App() {
  const isUserSignedIn = !!localStorage.getItem("token");
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isUserSignedIn && <Route path="/account" element={<Account />} />}
        {isUserSignedIn && <Route path="/Kyc" element={<Kyc />} />}
        {isUserSignedIn && (
          <Route path="/user/:nidNumber" element={<UserDetails />} />
        )}
        {isUserSignedIn && <Route path="/approved" element={<Approved />} />}
        {isUserSignedIn && <Route path="/my" element={<My />} />}
      </Routes>
    </div>
  );
}

export default App;
