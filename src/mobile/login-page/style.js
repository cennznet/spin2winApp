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
import GradientView from '../components/gradientView';

const backgroundColor = ({ type }) => {
  switch (type) {
    case 'light':
      return '#fff';
    default:
      return '#292939';
  }
};

export const View = styled.View`
`;

export const Container = styled(GradientView)`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-top: 100px;
`;

export const Image = styled.Image`
  width: 230px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 27px;
  margin-top: 15px;
`;

export const TitleContainer = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

export const StatusText = styled.Text`
  color: #f3f3f3;
  font-size: 12px;
  margin-top: -25px;
`;

export const Button = styled.TouchableOpacity`
  background: ${$props => backgroundColor($props)};
  border-radius: 23px;
  height: 46px;
  align-self: stretch;
  margin: 0px 30px 60px 30px;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const IconImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const ButtonText = styled.Text`
  color: #292939;
  font-size: 15px;
  margin-left: 5px;
`;

export const ActivityIndicator = styled.ActivityIndicator`
  color: #fff;
  margin-left: 10px;
`;
