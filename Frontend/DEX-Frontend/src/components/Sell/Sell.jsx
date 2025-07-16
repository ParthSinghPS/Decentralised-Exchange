import { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_EXCHANGE_RATE = 2000;

const Sell = () => {
  const [isTokenInput, setIsTokenInput] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleToggle = () => {
    setIsTokenInput(!isTokenInput);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    setInputValue(value);
  };

  const displayValue = () => {
    if (!inputValue) return "0.0";
    const num = parseFloat(inputValue);
    return isTokenInput
      ? "$" + (num * MOCK_EXCHANGE_RATE).toFixed(2)
      : (num / MOCK_EXCHANGE_RATE).toFixed(4) + " ETH";
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      {/* Toggler Tabs */}
      <div className="flex space-x-4 mb-6">
        <Link to="/swap">
          <button className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-gray-800 transition">
            Swap
          </button>
        </Link>
        <Link to="/buy">
          <button className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-gray-800 transition">
            Buy
          </button>
        </Link>
        <button className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm font-medium border border-gray-700">
          Sell
        </button>
      </div>


      {/* Sell Box */}
      <div className="w-full max-w-md bg-[#141414] p-6 rounded-2xl shadow-xl flex flex-col space-y-6 items-center relative">
        <div className="w-full text-center">
          <label className="text-sm text-gray-400 mb-1 block">
            {isTokenInput ? "Enter Token Amount (ETH)" : "Enter Amount (USD)"}
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full text-center text-3xl text-white font-semibold bg-transparent outline-none mt-1"
            placeholder="0.0"
          />
        </div>

        <div className="text-center text-gray-400 text-sm">
          ≈ {displayValue()}
        </div>

        <button
          onClick={handleToggle}
          className="flex items-center justify-center bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          <ArrowUpDown className="w-5 h-5" />
        </button>

        <div className="w-full">
          <label className="text-sm text-gray-400 mb-1 block">Select Token</label>
          <button className="w-full bg-[#1e1e1e] px-4 py-3 rounded-xl flex items-center justify-between border border-gray-700 text-white hover:bg-[#2a2a2a] transition">
            <div className="flex items-center space-x-2">
              <img src="/tokens/eth.svg" alt="ETH" className="w-5 h-5" />
              <span className="text-sm font-medium">Ethereum (ETH)</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <button className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm rounded-2xl transition">
          Connect wallet
        </button>
      </div>
    </div>
  );
};

export default Sell;
