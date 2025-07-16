import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const tokens = ["eth.svg", "usdc.svg", "dai.svg", "uni.svg", "link.svg"];

const Home = () => {
  const containerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const createToken = () => {
      const token = document.createElement("img");
      token.src = `/tokens/${tokens[Math.floor(Math.random() * tokens.length)]}`;
      token.className = "absolute w-8 h-8 blur-sm opacity-20 animate-float";
      token.style.top = `${Math.random() * 100}%`;
      token.style.left = `${Math.random() * 100}%`;
      container.appendChild(token);
      setTimeout(() => container.removeChild(token), 10000);
    };

    const interval = setInterval(createToken, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background floating tokens */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-10">
        {/* Swap / CTA Box */}
        <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Swap Your Tokens
          </h2>

          {/* From Input */}
          <div className="mb-5">
            <label className="text-sm text-gray-300">From</label>
            <div className="flex items-center mt-1 bg-gray-800 p-3 rounded-xl">
              <input
                type="number"
                placeholder="0.0"
                className="w-full bg-transparent text-lg font-medium text-white placeholder-gray-500 outline-none"
              />
              <span className="ml-2 text-sm font-semibold text-gray-300">ETH</span>
            </div>
          </div>

          {/* To Input */}
          <div className="mb-6">
            <label className="text-sm text-gray-300">To</label>
            <div className="flex items-center mt-1 bg-gray-800 p-3 rounded-xl">
              <input
                type="number"
                placeholder="0.0"
                className="w-full bg-transparent text-lg font-medium text-white placeholder-gray-500 outline-none"
              />
              <span className="ml-2 text-sm font-semibold text-gray-300">USDC</span>
            </div>
          </div>

          {/* Get Started Button (inside box) */}
          <button
            onClick={() => navigate("/swap")}
            className="w-full py-2 bg-blue-100 hover:bg-blue-400 hover:text-white text-black font-semibold rounded-xl transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
