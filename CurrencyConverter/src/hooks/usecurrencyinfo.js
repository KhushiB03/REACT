import { useEffect, useState } from "react";

function useCurrencyInfo(fromCurrency) {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!fromCurrency) return;

    setLoading(true);
    setError("");

    const url = `https://api.frankfurter.app/latest?base=${fromCurrency}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setRates(data.rates);  // <-- set all rates object here
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching rate");
        setLoading(false);
      });
  }, [fromCurrency]);

  return { rates, loading, error };  // <-- return rates object
}

export default useCurrencyInfo;
