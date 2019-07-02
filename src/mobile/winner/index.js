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

import React from 'react';
import { getRewardBalances } from '../../services/cennz-lib';
import {
  Container,
  AlertContainer,
  AlertContentContainer,
  AlertContent,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonText,
  Seperator
} from './style';

const content = () => {
  const [ cennz, cpay ] = getRewardBalances();
  return `Congratulations you've won ${cpay} CPAY! ` + 'You can check the balances in SingleSource app';
};

const WinnerAlertView = ({ onDismiss }) => (
  <Container>
    <AlertContainer>
      <AlertContentContainer>
        <AlertIcon source={require('../../images/winner.png')} />
        <AlertTitle>You're a winner!</AlertTitle>
        <AlertContent>{content()}</AlertContent>
      </AlertContentContainer>
      <Seperator />
      <Button onPress={onDismiss}>
        <ButtonText>Yay!</ButtonText>
      </Button>
    </AlertContainer>
  </Container>
);

export default WinnerAlertView;
