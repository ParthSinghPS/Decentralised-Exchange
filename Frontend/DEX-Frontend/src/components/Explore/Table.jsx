import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
        );
        const data = await res.json();
        setTokens(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch tokens:", err);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Tokens</h2>


        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-700">
            <Link
              to="/tokens"
              className={`px-6 py-2 text-sm md:text-base font-medium ${location.pathname === "/tokens"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
                } transition`}
            >
              Tokens
            </Link>
            <Link
              to="/pools"
              className={`px-6 py-2 text-sm md:text-base font-medium ${location.pathname === "/pools"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
                } transition`}
            >
              Pools
            </Link>
          </div>
        </div>


        {loading ? (
          <div className="text-center text-gray-400 text-lg">Loading tokens...</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#1e1e1e] shadow-lg">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-[#2a2a2a] border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Token</th>
                  <th className="px-4 py-3 text-left">Symbol</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr
                    key={token.id}
                    className="border-b border-gray-800 hover:bg-[#2c2c2c] transition"
                  >
                    <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <img src={token.image} alt={token.name} className="w-6 h-6 rounded-full" />
                      <span className="text-white">{token.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{token.symbol.toUpperCase()}</td>
                    <td className="px-4 py-3 text-green-400">${token.current_price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-300">${token.market_cap.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tokens;
