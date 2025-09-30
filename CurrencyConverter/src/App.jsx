import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/usecurrencyinfo";

function App() {
  const currencies = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "USD",
  ];
  const [amount, setAmount] = useState(""); // <-- added amount state
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");

  // pass only from currency here
  //hook to fetch rates from currency
  const { rates, loading, error } = useCurrencyInfo(from);

  const handleConvert = () => {
    if (!rates || !amount || isNaN(amount)) {
      setConvertedAmount("");
      return;
    }
    //to check they r of same datatype
    if (to === from) {
      setConvertedAmount(amount);
      return;
    }
    //fetches rate
    const rate = rates[to];
    if (!rate) {
      setConvertedAmount("N/A");
      return;
    }
    setConvertedAmount((amount * rate).toFixed(2.0));
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount("");
  };

  return (
    <>
      {/* Background Image */}
      <div
        className="w-full h-screen bg-cover justify-center items-center z-index-1"
        style={{
          backgroundImage:
            'url("https://www.etmoney.com/learn/wp-content/uploads/2023/02/investing-at-market-high-1.jpg")',
        }}
      ></div>

      <div className="outer-box">
        {/* From Section */}
        <div className="upper-box">
          <div className="curr">
            <p>
              From <br />
              <input
                type="number"
                placeholder="Amt"
                className="currency-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </p>
          </div>

          <div className="curr-type">
            <label htmlFor="from-currency">currency-type</label>
            <select
              id="from-currency"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <button className="swap-btn" onClick={handleSwap}>
          Swap
        </button>

        {/* To Section */}
        <div className="lower-box">
          <div className="curr">
            <p>
              To <br />
              <input
                type="text"
                placeholder="Converted Amt"
                className="currency-input"
                value={convertedAmount}
                readOnly
              />
            </p>
          </div>

          <div className="curr-type">
            <label htmlFor="to-currency">currency-type</label>
            <select
              id="to-currency"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*convert btn */}
        <button className="convert-btn" onClick={handleConvert}>
          Convert
        </button>

        {/* Optional Status */}
        {loading && <p className="msg">Loading rates...</p>}
        {error && <p className="msg">Error fetching rates: {error}</p>}
      </div>
    </>
  );
}

export default App;
