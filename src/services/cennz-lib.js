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

import { WsProvider } from '@cennznet/api/polkadot';
import { Api } from '@cennznet/api';
import BN from 'bn.js';

import { getNetwork } from './network';

let sdkApi = null;

const createApi = async () => {
  if (sdkApi) return sdkApi;

  const { url } = getNetwork();
  const provider = new WsProvider(url);
  sdkApi = await Api.create({ provider });
  return sdkApi;
};

const resetApi = () => sdkApi = null;

// balance
const getBalance = async (address) => {
  const api = await createApi();
  const ga = api.genericAsset;

  const balance = await ga.getFreeBalance(16001, address);
  return balance;
};

const getBalances = async (account) => {
  const { assets, address } = account;
  const getBalancePromises = assets.map(asset =>
    getBalance(address, asset.assetId)
  );

  const balances = await Promise.all(getBalancePromises);
  return balances;
};

const initialBal = new BN(0);
const previousBalances = { cennz: initialBal, cpay: initialBal };
const formatBal = (balances) => balances.map(bal => new BN(bal));

const updatePreviousBalances = (balances) => {
  const [ cennz, cpay ] = formatBal(balances);
  previousBalances.cennz = cennz;
  previousBalances.cpay = cpay;
}

const getPreviousBalances = async (account) => {
  const balances = await getBalances(account);
  updatePreviousBalances(balances);
};

let rewardBalances = [];
const getRewardBalances = () => rewardBalances;

const updateAccountBalances = async (account) => {
  const balances = await getBalances(account);
  const { cennz, cpay } = previousBalances;
  const [ cennz_n, cpay_n ] = formatBal(balances);
  if (cennz_n.eq(cennz) && cpay_n.eq(cpay)) {
    await updateAccountBalances(account);
    return;
  }

  rewardBalances = [cennz_n.sub(cennz), cpay_n.sub(cpay)];
  updatePreviousBalances(balances);

  const { assets } = account;
  const updatedAssets = assets.map((asset, index) => ({
    ...asset,
    balance: balances[index]
  }));

  return { ...account, assets: updatedAssets };
}

export {
  createApi,
  resetApi,
  getPreviousBalances,
  updateAccountBalances,
  getRewardBalances
};
