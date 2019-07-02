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

import React, { Component } from 'react';
import { Modal, StatusBar, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BN from 'bn.js';

import sendAward from '../../services/sendReward';
import { updateAccountBalances, getPreviousBalances } from '../../services/cennz-lib';
import { assets } from '../../services/assetTypes';
import LotteryPage from '../lottery';
import WinnerPage from '../winner';
import {
  Container,
  ContentContainer,
  ActivityIndicator,
  ScrollView,
  HeaderTitle,
  Address,
  Card,
  Amount,
  CardText,
  ButtonContainer,
  Touchable,
  ButtonText
} from './style';

const Button = ({ title, onPress }) => (
  <Touchable onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </Touchable>
);

class BalancePage extends Component {
  state = {
    account: null,
    isModal: true,
    isShowWinnerAlert: false
  }

  componentWillMount() {
    const { account } = this.props;
    this.setState({ account });
    getPreviousBalances(account);
  }

  get cardItems() {
    const { account } = this.state;
    const config = {
      [assets.CENNZ]: { colors: ['#1090ff', '#106eb1'], price: 0.2 },
      [assets.CPAY]: { colors: ['#9f6fff', '#7d3ffa'], price: 0.06 },
    };

    return account.assets.map(asset => ({ ...asset, ...config[asset.name]}));
  }

  onAlertShow = () => {
    const { isShowWinnerAlert } = this.state;
    if (!isShowWinnerAlert) {
      this.setState({ isShowWinnerAlert: true });
    }
  }

  onAlertDismiss = () => {
    this.setState({ isShowWinnerAlert: false });
  }

  onSendAward = () => {
    const { account: { address } } = this.props;
    this.setState({ isModal: false });
    sendAward(address)
      .then(() => this.updateBalances())
      .catch((e) => console.log('@>>>>>send award failed:', e));
  }

  updateBalances = () => {
    const { account } = this.state;
    updateAccountBalances(account).then(updatedAccount => {
      this.onAlertShow();
      this.setState({ account: updatedAccount });
    });
  }

  renderCard(item) {
    const { colors, name, price, balance = 0 } = item;
    if (name === assets.CENNZ) return null;

    const assetBalance = new BN(balance);
    const assetValue = (price * assetBalance.toNumber()).toFixed(2);

    return (
      <Animatable.View
        key={name}
        animation={'lightSpeedIn'}
        duration={500}
        easing="linear"
      >
        <Card colors={colors} key={name}>
          <CardText>{name}</CardText>
          {assetBalance.toNumber() == 0 ?
            <ActivityIndicator /> :
            <Amount>{assetBalance.toNumber()}</Amount>}
          <CardText>{`= ${assetValue} NZD`}</CardText>
        </Card>
      </Animatable.View>
    );
  }

  renderContent = () => {
    const { isModal, account } = this.state;
    const { onLogout } = this.props
    if (isModal) return null;

    return (
      <ContentContainer>
        <HeaderTitle>Your Balance</HeaderTitle>
        <Address>{account.address}</Address>
        <ScrollView>
          {this.cardItems.map(item => this.renderCard(item))}
        </ScrollView>
        <ButtonContainer>
          <Button title="Logout" onPress={onLogout} />
        </ButtonContainer>
      </ContentContainer>
    );
  }

  renderModal = () => {
    const { isModal, isShowWinnerAlert } = this.state;
    const visible = isModal || isShowWinnerAlert;

    return (
      <Modal
        transparent
        animationType={'fade'}
        visible={visible}
      >
        <StatusBar barStyle="dark-content" />
        {isModal && <LotteryPage onPress={this.onSendAward} />}
        {isShowWinnerAlert && <WinnerPage onDismiss={this.onAlertDismiss} />}
      </Modal>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        {this.renderModal()}
        {this.renderContent()}
      </Container>
    );
  }
}

export default BalancePage;
