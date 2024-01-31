import { useEffect, useState } from "react";
import styles from "./Coin.module.css";

function Converter({ coin }) {
  const [usd, setUSD] = useState(0);
  const [coins, setCoins] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const reset = () => {
    setUSD(0);
    setCoins(0);
  };
  const converter1 = (e) => {
    const num = e.target.value / coin.quotes.USD.price;
    setUSD(e.target.value);
    setCoins(num.toFixed(8));
  };
  const converter2 = (e) => {
    const num = e.target.value * coin.quotes.USD.price;
    setUSD(num.toFixed(3));
    setCoins(e.target.value);
  };
  const onDisable = () => {
    setDisabled((cureent) => !disabled);
  };
  return (
    <div>
      <div className="flex">
        <img className={styles.image} src="./usd.png" alt="USA" />
        <h2 className={styles.title}>USD</h2>
      </div>
      <input
        value={usd}
        onChange={converter1}
        type="number"
        disabled={disabled}
      />
      <div className={styles.arrowImgWrap} onClick={onDisable}>
        <img className={styles.arrowImg} src="./exchange.png" alt="downArrow" />
      </div>
      <div className="flex">
        <img
          className={styles.image}
          src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
          alt={`${coin.name}로고`}
        />
        <h2 className={styles.title}>{coin.symbol}</h2>
      </div>
      <input
        value={coins}
        onChange={converter2}
        type="number"
        disabled={!disabled}
      />
      <div className={styles.resetBtnWrap}>
        <span className={styles.resetBtn} onClick={reset}>
          reset
        </span>
      </div>
    </div>
  );
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState("-1");
  const [selected, setSelected] = useState([]);
  const onSelect = () => {
    const tokenMenu = document.querySelector(".tokenMenu");
    tokenMenu.classList.toggle("toggle");
  };
  const onClickMenu = (e) => {
    const tokenMenu = document.querySelector(".tokenMenu");
    tokenMenu.classList.remove("toggle");
    setIndex(e.target.value);
    if (e.target.value === "-1") {
      setSelected([]);
    } else {
      setSelected(coins[e.target.value]);
    }
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div
          style={{ marginTop: "50px", textAlign: "center", fontSize: "30px" }}
        >
          Loading...
        </div>
      ) : (
        <div className={styles.bg}>
          <div className="tokenMenuWrap">
            <button onClick={onSelect}>Select a token ▼</button>
            <ul className="tokenMenu">
              {coins.map((coin, idx) => (
                <li
                  key={coin.id}
                  className={index === idx ? "active" : ""}
                  value={idx}
                  onClick={onClickMenu}
                >
                  {coin.name}
                </li>
              ))}
            </ul>
          </div>
          {index === "-1" ? (
            <h3 className={styles.initTitle}>Please Select Coin</h3>
          ) : (
            <Converter coin={selected} />
          )}
        </div>
      )}
    </div>
  );
}

export default Coin;
