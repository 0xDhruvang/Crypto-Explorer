import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import axios from "axios";
import { CoinList } from "./config/api";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "AED") setSymbol("د.إ");
    else if (currency === "ARS") setSymbol("$");
    else if (currency === "AUD") setSymbol("$");
    else if (currency === "BDT") setSymbol("৳");
    else if (currency === "BHD") setSymbol("دينار");
    else if (currency === "BMD") setSymbol("$");
    else if (currency === "BRL") setSymbol("R$");
    else if (currency === "CAD") setSymbol("$");
    else if (currency === "CHF") setSymbol("Fr.");
    else if (currency === "CLP") setSymbol("$");
    else if (currency === "CNY") setSymbol("¥");
    else if (currency === "CZK") setSymbol("Kč");
    else if (currency === "DKK") setSymbol("Kr.");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "GBP") setSymbol("£");
    else if (currency === "HKD") setSymbol("$");
    else if (currency === "HUF") setSymbol("Ft");
    else if (currency === "IDR") setSymbol("Rp");
    else if (currency === "ILS") setSymbol("₪");
    else if (currency === "JPY") setSymbol("¥");
    else if (currency === "KRW") setSymbol("₩");
    else if (currency === "KWD") setSymbol("دينار كويتي");
    else if (currency === "LKR") setSymbol("රු");
    else if (currency === "MMK") setSymbol("K");
    else if (currency === "MXN") setSymbol("Mex$");
    else if (currency === "MYR") setSymbol("RM");
    else if (currency === "NGN") setSymbol("₦");
    else if (currency === "NOK") setSymbol("kr");
    else if (currency === "NZD") setSymbol("$");
    else if (currency === "PHP") setSymbol("₱");
    else if (currency === "PKR") setSymbol("Rs");
    else if (currency === "PLN") setSymbol("zł");
    else if (currency === "RUB") setSymbol("₽");
    else if (currency === "SAR") setSymbol("ر.س");
    else if (currency === "SEK") setSymbol("kr");
    else if (currency === "SGD") setSymbol("S$");
    else if (currency === "THB") setSymbol("฿");
    else if (currency === "TRY") setSymbol("₺");
    else if (currency === "TWD") setSymbol("NT$");
    else if (currency === "UAH") setSymbol("د.إ");
    else if (currency === "VEF") setSymbol("Bs.");
    else if (currency === "VND") setSymbol("₫");
    else if (currency === "ZAR") setSymbol("R");

    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        coins,
        loading,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};