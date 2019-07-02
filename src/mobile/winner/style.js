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

import { StyleSheet } from 'react-native';
import styled from 'styled-components';

// recovery alert
export const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

export const AlertContainer = styled.View`
  background-color: #fff;
  margin: 0px 25px 10px 25px;
  border-radius: 10px;
`;

export const AlertContentContainer = styled.View`
  align-items: center;
  background-color: #fff;
  margin: 30px 20px 40px 20px;
`;

export const AlertIcon = styled.Image`
  height: 75px;
  width: 75px;
`;

export const AlertTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #1e2022;
  margin-top: 20px;
  letter-spacing: 0.1;
`;

export const AlertContent = styled.Text`
  text-align: center;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: 0.1;
  color: #7f878d;
  margin-top: 10px;
`;

export const Seperator = styled.View`
  background-color: #d3d3d3;
  height: ${StyleSheet.hairlineWidth};
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  margin: 0px 20px 0px 20px;
`;

export const ButtonText = styled.Text`
  color: #1e2022;
  font-size: 15px;
  margin-left: 5px;
  font-weight: 500;
`;