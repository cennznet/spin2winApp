/**
 * Copyright 2019 Centrality Investments Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { u8aToHex, hexToU8a } from '@cennznet/util';
import { Wallet, SimpleKeyring } from '@cennznet/wallet';
import { waitReady } from '@plugnet/wasm-crypto';
import BN from 'bn.js';

import spin2win from './spin2win';
import { getNetwork } from './network';
import { createApi } from './cennz-lib';

const master = {
  address: '5C8JSNofegsFjwYHnrG7XtG1hCJ2PEtvQQFPkfeo75aLv6uB',
  seed: '0x6dfc73017eece8dbbf89736abdcefa5dcf9536a3c06da21031108f68f57382f7'
}

const createWallet = async () => {
  const simpleKeyring = new SimpleKeyring();
  simpleKeyring.addFromSeed(hexToU8a(master.seed));
  const wallet = new Wallet();

  await wallet.createNewVault('666');
  await wallet.addKeyring(simpleKeyring);
  return wallet;
};

const configApi = async () => {
  await waitReady();
  const api = await createApi();
  const wallet = await createWallet();
  api.setSigner(wallet);
  return api;
};

const sendAward = async (address) => {
  const { contractAddress } = getNetwork();
  const payload = spin2win(address);
  const endowment = new BN('10000');
  const api = await configApi();

  const tx =  api.tx.contract.call(
    contractAddress,
    endowment, // deposit amount
    200000,    // gas fee
    payload
  );

  const txHash = await tx.signAndSend(
    master.address, 
    async ({events, status}) => {
      if (status.isFinalized && events !== undefined) {
        const blockHash = status.asFinalized;
        console.log('@---blockHash---@:', u8aToHex(blockHash));
      }});

  return txHash;
};

export default sendAward;
