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
  Image,
  Button,
  HeaderContainer,
  ContentContainer,
  ActivityIndicator,
  IconImage,
  ButtonText
} from './style';

const LoginPage = ({ onConnectSS, isRequesting }) => {
  return (
    <Container>
      <HeaderContainer>
        <Image source={require('../../images/logo.png')} resizeMode="contain" />
      </HeaderContainer>
      <Button type={'light'} onPress={onConnectSS}>
        <ContentContainer>
          <IconImage source={require('../../images/ss-icon.png')} />
          <ButtonText>Connect SingleSource ID</ButtonText>
          {isRequesting && <ActivityIndicator />}
        </ContentContainer>
      </Button>
    </Container>
  );
};

export default LoginPage;
