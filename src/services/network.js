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

import { Alert } from 'react-native';

// TODO: support input url
const apiKey = '5b55b29e-bcb0-4ec7-9ae3-7c262ab0029c';

const networks = {
  rimu: {
    url: `wss://rimu.unfrastructure.io/ws?apikey=${apiKey}`,
    contractAddress: '5EmcW7ndycEYkTjLoTpZKbChRKrqL7oQ1LNcuLXGUhZGg2zE',
    type: 'Rimu'
  },
};

const network = { ...networks.rimu };
const changeNetwork = net => Object.assign(network, { ...net });

export const getNetwork = () => network;

export const changeNetworkAlert = (callback) => {
  Alert.alert(`Environment (${network.type})`, 'change the network to', [
    {
      text: networks.kauri.type,
      onPress: () => {
        changeNetwork(networks.kauri);
        callback();
      }
    },
    {
      text: networks.rimu.type,
      onPress: () => {
        changeNetwork(networks.rimu);
        callback();
      }
    }
  ]);
};
