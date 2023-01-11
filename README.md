
# Bixlabs Challenge

This challenge is developed in React using Typescript. It also uses the following libraries: Ethers.js, Web3React and Safe Global SDK. Metamask extension is required to interact with the Blockchain.

There are four panels for each main functionality:
* Wallet Connect and Account Information.
* Gnosis Safe Management.
* ETH Sending.
* Account Trasactions Info.





## Installation

**NPM**
```console
$ npm install 
```

**YARN**
```console
$ yarn install 
```



    
## Run Locally
**NPM**
```console
$ npm start
```

**YARN**
```console
$ yarn start 
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_ETHERSCAN_API_KEY`: API KEY for Etherscan API.

`REACT_APP_ETHERSCAN_URL`: Endpoint of Etherscan API. 

`REACT_APP_SERVICE_URL`: Gnosis Safe Service URL.

Be sure to configure URLs according to the working network (Mainnet, Goerli, etc).


## Usage

### Wallet Connect and Account Information
Connect via Metamask. On successful connection, it will display the wallet address (short display), current block number and current ETH Balance.

### Gnosis Safe Management
A Gnosis Safe can be loaded, showing current owners (addresses and nicknames) and threshold. This info can be edited. NOTE: The nicknames are stored locally as Gnosis Contract doesn't store this info.

It is also possible the creation of a Gnosis Safe, with custom owners and threshold.

### ETH Sending.
A simple form to send ETH, entering destination address and ETH amount.

### Account Trasactions Info.
It is possible to retreive a list of transactions made by the account, linking each one with the etherscan info page.
