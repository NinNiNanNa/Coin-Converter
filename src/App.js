import Coin from "./Coin";
import "./style.css";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <header>
        <div className="wrap">
          <div className="gap">
            <div className="container flex">
              <img src="/logo.png" alt="로고이미지" />
              <div className={styles.title}>Coin Converter</div>
            </div>
          </div>
        </div>
      </header>
      <div className="wrap">
        <div className="gap">
          <div className="container">
            <Coin></Coin>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
