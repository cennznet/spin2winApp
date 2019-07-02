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

import {
  Container,
  Button,
  ButtonText,
  WrapperContainer,
  ImageContainer,
  Title,
  Text,
  Image
} from './style';

const imageSource = require('../../images/spinner.png');
const desc = 'Press the button to try your luck at winning some tokens';

const LotteryPage = ({ onPress }) => (
  <Container>
    <ImageContainer>
      <Image source={imageSource} resizeMode="contain" />
    </ImageContainer>
    <WrapperContainer>
      <Title>{'Spin to win!'}</Title>
      <Text>{desc}</Text>
      <Button onPress={onPress}>
        <ButtonText>Try my luck!</ButtonText>
      </Button>
    </WrapperContainer>
  </Container>
);

export default LotteryPage;
