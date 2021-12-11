import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { ethers } from 'ethers';
import MatchingMarket from './artifacts/contracts/MatchingMarket.sol/MatchingMarket.json';
import DropButton from './Components/DropButton';
import AmountInput from './Components/AmountInput';
import ConfirmButton from './Components/ConfirmButton';

const ECFAddress = "0x511f176d4BC3f76C28F45bC90e50a911e7166164";

function App() {
  const [wager, setWager] = useState();
  const [coinFlipId, setCoinFlipId] = useState();
  const [buyAddress, setBuyAddress] = useState(null);
  const [spendAddress, setSpendAddress] = useState(null);
  const [buyAmount, setBuyAmount] = useState(0);
  const [spendAmount, setSpendAmount] = useState(0);

  const wrappedSetBuyAmount = useCallback((val) => {
    setBuyAmount(val);
  });

  const wrappedSetSpendAmount = useCallback((val) => {
    setSpendAmount(val);
  });

  const wrappedSetBuyAddress = useCallback((val) => {
    let address = null;
    if(val === "LINK") {
      address = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
    } else if(val === "wETH") {
      address = "0xc778417E063141139Fce010982780140Aa0cD5Ab"
    } else if(val === "DAI") {
      address = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D"
    }
    setBuyAddress(address);
  });

  const wrappedSetSpendAddress = useCallback((val) => {
    let address = null;
    if(val === "LINK") {
      address = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
    } else if(val === "wETH") {
      address = "0xc778417E063141139Fce010982780140Aa0cD5Ab"
    } else if(val === "DAI") {
      address = "0x6A9865aDE2B6207dAAC49f8bCba9705dEB0B0e6D"
    }
    setSpendAddress(address);
  });

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }


async function startTrade() {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ECFAddress, MatchingMarket.abi, signer);
  }
}

  async function startCoinFlip() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ECFAddress, MatchingMarket.abi, signer);
      let updatedWager = ethers.utils.parseEther(wager.toString());
      const tx = await contract.matchingMarket({ value: updatedWager });
      tx.wait();
      console.log(`You started the wager with ${ethers.utils.formatEther(updatedWager)} ETH`);
      let event = contract.on('EtherCoinFlipped', (coinFlipId) => {
        alert(`CoinFlipID ${coinFlipId} was flipped`);
      });
      event.wait();
    }
  } 

  async function endCoinFlip() {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ECFAddress, MatchingMarket.abi, signer);
    let updatedWager = ethers.utils.parseEther(wager.toString());
    const tx = await contract.endCoinFlip(coinFlipId, {value: updatedWager});
    tx.wait();
    console.log(tx);
    let event = contract.on('EtherCoinFinishedFlip', (winner) => {
        alert(`${winner} won the coin flip.`);
      });
      event.wait();
  }



  


  
  return (
    <div className="App">

    <header className="App-header">
      <h1>ERC20 Rinkeby Market</h1>
    </header>
    <div className="main">
    <h1>Select Market</h1>
    <div className="flex-container">

      <div className="flex-left">
        <div><h2>Buy</h2></div>
        <DropButton option="buy" parentSetter={wrappedSetBuyAddress} />
        <AmountInput setAmount={wrappedSetBuyAmount}/>
        {/* <button value={wager} onClick={startCoinFlip}>Start the coin flip!</button>
        <input onChange={e => setWager(e.target.value)} placeholder="Send your ETH"/>
        <br />
              <h2>End a wager</h2> */}
      </div>
      <div className="flex-right">
        <div><h2>Spend</h2></div>
        <DropButton option="spend" parentSetter={wrappedSetSpendAddress} />
        <AmountInput setAmount={wrappedSetSpendAmount}/>
        {/* <h4>Send ETH to a coin flip that has already begun</h4>
        <button value={wager} onClick={endCoinFlip}>End a coin flip!</button>
        <input onChange={e => setWager(e.target.value)} placeholder="Send your ETH"/>
        <input value={coinFlipId} onChange={e => setCoinFlipId(e.target.value)} placeholder="Coin Flip ID"/> */}
      </div>
      
    </div>
      <div className="flex-mid">
        <ConfirmButton spendAmount={spendAmount} spendAddress={spendAddress} buyAmount={buyAmount} buyAddress={buyAddress} startTrade={startTrade}/>
      </div>
    </div>
    <div className="flex-container">
      <div className="flex-left">

      </div>
      <div className="flex-right">

      </div>
    </div>
    


    <footer className="footer">
      <p> Please note this uses the Rinkeby test network. Using any other network will result in lost funds.</p>
    </footer>
    
    
    </div>
    
  );

  
}


export default App;
