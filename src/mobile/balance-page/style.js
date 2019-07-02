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

import styled from 'styled-components';
import { Dimensions } from 'react-native';
import GradientView from '../components/gradientView';

const screenHeight = Dimensions.get('window').height;
const cardHeight = (screenHeight - 290) / 3;
const radio = (cardHeight / 132).toFixed(2);

export const Container = styled(GradientView)`
  flex: 1;
`;

export const ContentContainer = styled.SafeAreaView`
  flex: 1;
  margin: 50px 25px 25px 25px;
`;

export const Address = styled.Text`
  align-self: flex-start;
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 15px;
  color: #d3d3d3;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  align-self: flex-start;
`;

export const ScrollView = styled.ScrollView`
`;

export const Card = styled(GradientView)`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 25px;
  align-self: stretch;
  height: ${cardHeight};
`;

export const Amount = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: ${radio * 30}px;
  margin: 5px 0px 5px 0px;
`

export const ActivityIndicator = styled.ActivityIndicator`
  margin: 10px 0px 10px 0px;
  color: #fff;
`;

export const CardText = styled.Text`
  color: #fff;
  font-size: ${radio * 13}px;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Separator = styled.View`
  background-color: transparent;
  width: 20px;
`

export const Touchable = styled.TouchableOpacity`
  flex: 1;
  background: #1e1d29;
  border-radius: 5px;
  border-width: 1px;
  border-color: #fff;
  height: 46px;
  align-self: stretch;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;