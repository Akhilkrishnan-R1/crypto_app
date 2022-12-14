import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const GlobalContext = ({ children }) => {
  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹");
  const [days, setDays] = useState(1)

  useEffect(() => {
    if (currency === "inr") setSymbol("₹");
    else if (currency === "usd") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, days, setDays }}>
      {children}
    </Crypto.Provider>
  );
};

export default GlobalContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

