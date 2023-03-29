import { useState, useEffect } from "react";
import "./Main.css";

function Accounts({ web3, setAccount, account }) {

    const [balance, setBalance] = useState("None");
    const [provider, setProvider] = useState("None")
    const [arr, setArray] = useState([]);



    useEffect(() => {
        async function allAccounts() {

            if (window.ethereum) {
                try {

                    const options = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    console.log(options)

                    setProvider(getCurrentProvider());

                    setArray(options);
                } catch (error) {
                    setProvider("not connected");
                    console.log(error);
                }
            }


        }
        setTimeout(() => {
            setInterval(() => {
                allAccounts();
            }, 10000);

        }, 3000);

    }, []);

    function getCurrentProvider() {
        if (!window.web3) return 'unknown';

        if (window.web3.currentProvider.isMetaMask)
            return 'metamask';

        if (window.web3.currentProvider.isTrust)
            return 'trust';

        if (window.web3.currentProvider.isGoWallet)
            return 'goWallet';

        if (window.web3.currentProvider.isAlphaWallet)
            return 'alphaWallet';

        if (window.web3.currentProvider.isStatus)
            return 'status';

        if (window.web3.currentProvider.isToshi)
            return 'coinbase';

        if (typeof window.__CIPHER__ !== 'undefined')
            return 'cipher';

        if (window.web3.currentProvider.constructor.name === 'EethereumProvider')
            return 'mist';

        if (window.web3.currentProvider.constructor.name === 'EthereumFrameProvider')
            return 'parity';

        if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
            return 'infura';

        if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
            return 'localhost';

        return 'unknown';
    }


    async function selectAccount() {
        let selectedAccount = document.querySelector("#selectNumber").value;
        if (selectedAccount && selectedAccount !== "Select an account") {
            const accountBalance = await web3.eth.getBalance(selectedAccount)
            const etherBalance = web3.utils.fromWei(accountBalance, "ether");
            setBalance(etherBalance);
            setAccount(selectedAccount);
        }
    }



    return (
        <div className="outterdiv">
            <form className="label1" id="myForm">
                <label htmlFor="selectNumber">Select an account</label>
                <select className="innerBox" id="selectNumber" onChange={selectAccount} >
                    <option>Select an account</option>
                    {arr.map((option) => <option>{option}</option>)}
                </select>
            </form>
            <span className="conAc">Connected Account: {JSON.stringify(account)}</span>
            <br></br>
            <span className="acBal">Account Balance:{JSON.stringify(balance)} ether</span>
            <br></br>
            <span className="provider">Provider : {JSON.stringify(provider)}</span>
        </div>
    );
}

export default Accounts;
