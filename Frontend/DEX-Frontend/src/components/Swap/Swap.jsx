import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowDown } from "lucide-react";

const MOCK_EXCHANGE_RATE = 2000; // 1 ETH = $2000

const Swap = () => {
  const [isSellActive, setIsSellActive] = useState(true);
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");

  const handleInputChange = (value) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    if (isSellActive) {
      setSellAmount(value);
      setBuyAmount(value ? (parseFloat(value) / MOCK_EXCHANGE_RATE).toFixed(4) : "");
    } else {
      setBuyAmount(value);
      setSellAmount(value ? (parseFloat(value) * MOCK_EXCHANGE_RATE).toFixed(2) : "");
    }
  };

  const handleSwapDirection = () => {
    setIsSellActive(!isSellActive);
    setSellAmount("");
    setBuyAmount("");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm font-medium border border-gray-700">
          Swap
        </button>
        <Link to="/buy">
          <button className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-gray-800 transition">
            Buy
          </button>
        </Link>
        <Link to="/sell">
          <button className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-gray-800 transition">
            Sell
          </button>
        </Link>
      </div>

      {/* Main Box */}
      <div className="w-full max-w-md relative">
        <div className="bg-[#141414] p-4 pt-6 rounded-2xl shadow-xl space-y-6 relative z-10">
          {/* Sell Box */}
          <div className="bg-[#1e1e1e] p-4 rounded-xl flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1">Sell</label>
              {isSellActive ? (
                <input
                  type="text"
                  value={sellAmount}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="bg-transparent text-3xl text-white font-semibold outline-none w-36"
                  placeholder="0.0"
                />
              ) : (
                <div className="text-3xl text-white font-semibold">{sellAmount || "0"}</div>
              )}
            </div>
            <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center space-x-1">
              <span>Select token</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Buy Box */}
          <div className="bg-[#1e1e1e] p-4 rounded-xl flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1">Buy</label>
              {!isSellActive ? (
                <input
                  type="text"
                  value={buyAmount}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="bg-transparent text-3xl text-white font-semibold outline-none w-36"
                  placeholder="0.0"
                />
              ) : (
                <div className="text-3xl text-white font-semibold">{buyAmount || "0"}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                ${isSellActive ? sellAmount : (buyAmount * MOCK_EXCHANGE_RATE).toFixed(2) || 0}
              </div>
            </div>
            <button className="bg-[#2b2b2b] text-white text-sm font-medium px-3 py-2 rounded-full flex items-center space-x-1 border border-gray-700">
              <img src="/tokens/eth.svg" alt="ETH" className="w-5 h-5" />
              <span>ETH</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Connect Wallet */}
          <button className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm rounded-2xl transition">
            Connect wallet
          </button>
        </div>

        {/* Arrow Overlap */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-5 z-20">
          <button
            onClick={handleSwapDirection}
            className="bg-black border-4 border-[#141414] p-2 rounded-full hover:bg-gray-800 transition"
          >
            <ArrowDown className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swap;
