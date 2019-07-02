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

import React, {Component} from 'react';
import { View, Linking, StatusBar, Alert } from 'react-native';
import { get } from 'lodash';

import { handleDeepLinking, requestAccountAccess } from './src/services/deepLinking';
import LoginPage from './src/mobile/login-page';
import BalancePage from './src/mobile/balance-page';
import { createApi } from './src/services/cennz-lib';
import exceptionsHandlerRegister from './src/services/exceptionHandler';
import { getNetwork } from './src/services/network';
import { assetTypes } from './src/services/assetTypes';

exceptionsHandlerRegister();
createApi();

const defaultState = {
  account: null,
  isLogin: false,
  isRequesting: false,
};

export default class App extends Component {
  state = defaultState;

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  configAccount = (accounts) => {
    const firstAccount = accounts[0];
    const assets = firstAccount.assets.map(
      asset => ({ 
        ...asset,
        name: assetTypes[asset.assetId]
    }));

    const account = { ...firstAccount, assets };
    return account;
  }

  handleOpenURL = (event) => {
    const response = handleDeepLinking(event.url);
    const accounts = get(response, 'accounts');
    if (accounts) {
      const account = this.configAccount(accounts);
      this.setState({ isLogin: true, isRequesting: false, account });
    } else {
      Alert.alert('The account is empty, please make sure the \
                  SingleSource Wallet contains accounts');
    }
  }

  onConnectSS = () => {
    const network = getNetwork().type;
    requestAccountAccess()
      .then(() => this.setState({ isRequesting: true }))
      .catch(() => Alert.alert(
        'Connection error',
        `Please make sure you install the mySingleSource-${network} app \ 
          or you can switch the network`
      ));
    ;
  }

  onLogout = () => {
    this.setState(defaultState);
  }

  render() {
    const { isRequesting, account, isLogin } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {isLogin ?
          <BalancePage
            account={account}
            onLogout={this.onLogout} 
          /> :
          <LoginPage
            onConnectSS={this.onConnectSS}
            isRequesting={isRequesting}
          />
        }
      </View>
    );
  }
}
