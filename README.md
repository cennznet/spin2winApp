# Spin2Win App

A React-Native demo app to request accounts authorization from [SingleSource App](https://testflight.apple.com/join/gfagbjh7) and
call [spin2win](https://github.com/cennznet/spin2win) smart contract which transfers a
random amount of balance to the calling account.

## Setup Environment

This project requires you local node version as `^10.13.0`. You can use `nvm` to install
and select the specific node version.

1. `brew install nvm`
2. `nvm install 10.13.0`
3. `nvm use 10.13.0`

## Run Project

1. `yarn install`
2. Run `react-native run-ios`

## Demo Screen

![image](https://github.com/cennznet/spin2winApp/blob/master/resources/demo.gif)


## Play with Contract

#### 1. Build and deploy the contract
You can follow this doc to Build and deploy the contract: [spin2win](https://cennznetdocs.com/CENNZNet/tutorials/spin2win.md).

#### 2. Contract address and ABI file
After you build and deploy the contract you will get two items to be used in the next step:
- [Contract address](https://github.com/cennznet/spin2winApp/blob/master/src/services/network.js)
- [Contract ABI  json file](https://github.com/cennznet/spin2winApp/blob/master/src/services/Spin2Win.json) 

For `Contract ABI` of spin2win:

```json
"messages": [{
    "name": "spin",
    "selector": 2121348255,
    "mutates": false,
    "args": [{
      "name": "player",
      "type": "AccountId"
    }],
    "return_type": null
  }]
```

You will see there is only one method in the contract, and the method name is `spin`, and only one parameter for `spin`, the type is `AccountId`.

#### 3. Call contract

#### [Construct a ContractABI instance](https://github.com/cennznet/spin2winApp/blob/master/src/services/spin2win.js):
You can use this instance to call any messages in the contract ABI file with the correct args. The function will return a `payload` (hex value), this signature includes all the information of the message.

#### [Create transaction](https://github.com/cennznet/spin2winApp/blob/master/src/services/sendReward.js):

Creating [`api`](https://github.com/cennznet/spin2winApp/blob/7dd149e770ccd66bd4bced4e93d45e21cb6fcb35/src/services/cennz-lib.js#L25) and [`set signer`](https://github.com/cennznet/spin2winApp/blob/7dd149e770ccd66bd4bced4e93d45e21cb6fcb35/src/services/sendReward.js#L41).

Calling `api.tx.contract.call` to get `tx` object:
```javascript
  const tx =  api.tx.contract.call(
    contractAddress,
    endowment, // deposit amount, can be 0: BigNumber
    200000,    // gas fee
    payload    // the payload when calling specific message
  );
```
The last step: [`sign and send the tx`](https://github.com/cennznet/spin2winApp/blob/7dd149e770ccd66bd4bced4e93d45e21cb6fcb35/src/services/sendReward.js#L62). You can get the transaction status and all the event details inside the code and also check them on [CENNZnet UI](https://cennznet.js.org/cennznet-ui/#/explorer/query) with `block hash`.

#### 4. Common issues

-  The signer should have enough funds to sign a transaction. You can get tokens through [faucet](https://cennznet.js.org/faucet-ui/).
-  The network(Localhost or Rimu) of deploying contract and calling contract should be the same one.
- For spin2win contract, should make sure the contract has enough funds to allocate assets. You can also top up the contract, using contract address, through [faucet](https://cennznet.js.org/faucet-ui/).
