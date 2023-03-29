import { useState, useEffect } from "react";
import Web3 from "web3";
import Welcome from "./components/Welcome.jsx";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import "./App.css";

function App() {

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("null");


  useEffect(() => {

    const init = async () => {

      const prov = new Web3.providers.HttpProvider("https://eth-goerli.g.alchemy.com/v2/50TxVpNA9eZEPu9ohOGr5WDkgqXWxaR0");

      try {
        const web3 = new Web3(prov);
        setWeb3(web3);
        // const networkId = await web3.eth.net.getId();
        // console.log(state);
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  //on first render/mount only!



  return (
    <div className="Flex">
      <div className="welMargin">
        <Welcome />
      </div>
      <div className="Account">
        {web3 && <Accounts web3={web3} setAccount={setAccount} account={account} />}
      </div>

      <div>
        {account !== "null" && <SendEther web3={web3} account={account} />}
      </div>
    </div>
  );
};
export default App;
