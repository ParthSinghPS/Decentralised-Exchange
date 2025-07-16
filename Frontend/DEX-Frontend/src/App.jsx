import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import Swap from "./components/Swap/Swap.jsx";
import Buy from "./components/Buy/Buy.jsx";
import Sell from "./components/Sell/Sell.jsx";
import Tokens from "./components/Explore/Table.jsx";
import Pool from "./components/Explore/Pool.jsx";
import CreatePosition from "./components/Pool/CreatePosition.jsx";
import ViewPosition from "./components/Pool/ViewPosition.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <div className="p-4">
          {/* Dummy routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swap" element={<Swap/>} />
            <Route path="/buy" element={<Buy/>} />
            <Route path="/sell" element={<Sell/>} />
            <Route path="/tokens" element={<Tokens/>} />
            <Route path="/pools" element={<Pool/>} />
            <Route path="/create-position" element={<CreatePosition/>} />
            <Route path="/view-position" element={<ViewPosition/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
