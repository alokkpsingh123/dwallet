import { useState } from "react";
import "./Main.css";

function SendEther({ web3, account }) {

  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);

  async function sendEther(event) {
    console.log("account =>", account);
    if (account) {

      event.preventDefault();
      const _to = document.querySelector("#to").value;
      const _value = document.querySelector("#value").value;
      const weiValue = web3.utils.toWei(_value, "ether");


      const transactionParam = {
        from: account,
        to: _to,
        value: weiValue
      };

      window.ethereum.request({ method: 'eth_sendTransaction', params: [transactionParam] }).then(txhash => {
        console.log(txhash);
        checkTransactionconfirmation(txhash).then(r => alert(r));
      });

      function checkTransactionconfirmation(txhash) {

        let checkTransactionLoop = () => {
          return window.ethereum.request({ method: 'eth_getTransactionReceipt', params: [txhash] }).then(r => {
            if (r != null) {
              console.log(r);
              setReceipt(r);
              setToggle(true);
              return 'Confirmed';
            }
            else return checkTransactionLoop();
          });
        };

        return checkTransactionLoop();
      }



      //sending transcation
      // web3.eth.sendTransaction({
      //   from: account,
      //   to: _to,
      //   value: weiValue,
      // }).then(function (receipt) {
      //   setReceipt(receipt);
      //   console.log(receipt);
      //   setToggle(true);
      // });
    } else {
      alert("Please select the account");
    }

  }



  return (
    <div>
      <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>(Json Response)</h3>
          <code>{toggle &&
            JSON.stringify(
              receipt,
              ["transactionHash", "blockHash", "blockNumber", "gasUsed"],
              2
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default SendEther;
