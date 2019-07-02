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

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const WrapperContainer = styled.View`
  flex: 0.9;
`;


export const ImageContainer = styled.View`
  flex: 1.1;
  justify-content: flex-end;
  align-items: center;
`;

export const Image = styled.Image`
  width: 230px;
`;

export const Title = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 22px;
  color: #1e1d29;
  font-weight: 500;
`;

export const Text = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 15px;
  line-height: 20px;
  margin: 10px 50px 25px 50px;
  color: #8f8f8f;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  margin-left: 5px;
`;

export const Button = styled.TouchableOpacity`
  background: #1e1d29;
  border-radius: 23px;
  height: 46px;
  align-self: stretch;
  margin: 25px;
  justify-content: center;
  align-items: center;
`;