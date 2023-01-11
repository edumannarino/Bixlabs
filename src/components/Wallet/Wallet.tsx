import React, { useState, useEffect } from 'react';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { ethers } from "ethers";

export default function Wallet() {

  function getErrorMessage(error: Error | undefined) {
    if (!error) {
      return "";
    } 
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } 
    if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    }
    if (error instanceof UserRejectedRequestErrorInjected) {
      return "Please authorize this website to access your Ethereum account.";
    } 
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }  

  const injected = new InjectedConnector({
    supportedChainIds: [5]
  });

  const {
    library,
    account,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();

  const [blockNumber, setBlockNumber] = useState<number | undefined>(0);
  const [balance, setBalance] = useState<string>("0");
  const errorMessage = getErrorMessage(error);

  useEffect(() => {
    try {
      if (library){
        const updateBalance = async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          if (account) {
            const currentBalance = await provider.getBalance(account)
            const remainder = currentBalance.mod(1e14);
            setBalance(ethers.utils.formatEther(currentBalance.sub(remainder)))
          }
        }

        const updateData = async (blockNumber: number) => {
          setBlockNumber(blockNumber);
          updateBalance()  
                
        };

        library.on("block", updateData);

        return () => {
          library.removeListener("block", updateData);
          setBlockNumber(undefined);
        };
      } else {
        setBlockNumber(undefined);
        setBalance("0");
      }
    } catch (error: any) {
      window.alert(error.message)
    }
      
  }, [account, library]);  

  return (
    <div className='box big-box bg-general'>
      <h1 >
        {active ? "🟢" : error ? "🔴" : "🟠"}
      </h1>
      <div>
        
        {account === undefined ? "..."  : account === null
                              ? "None" : `${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
      </div>
      <div>{errorMessage}</div>
      <div>Block Number: {blockNumber}</div>
      <div>Balance: {balance} ETH</div>
      <br/>
      {!active && <button onClick={() => activate(injected)}>Connect Wallet </button>}
      {active && <button onClick={() => deactivate()}>Disconnect Wallet </button>}
      <br/>
    </div>  
  );      
};
