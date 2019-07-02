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

import { Linking } from 'react-native';
import lzString from 'lz-string';
import v4 from 'uuid';
import { getNetwork } from './network';

const urlQueryParams = (url)=> {
  const hashes = url.slice(url.indexOf('?') + 1).split('&');
  return hashes.reduce((params, hash) => {
    const [key, val] = hash.split('=');
    return {
      ...params,
      [key]: lzString.decompressFromEncodedURIComponent(val)
    };
  }, {});
};

export const handleDeepLinking = (url) => {
  const params = url.replace(/.*?:\/\//g, '').split('?');
  if (!params) return null;

  const action = params[0];
  const decodedURI = urlQueryParams(url);
  const { response } = decodedURI;
  return action === 'auth' && response && JSON.parse(response);
};

export const requestAccountAccess = () => {
  const network = getNetwork().type;
  const content = {
    environment: network.toUpperCase(),
    type: 'connectRequest',
    sessionId: v4(), 
    callback: 'spin2winApp://auth'
  };

  const request = JSON.stringify(content);
  const compressed = lzString.compressToEncodedURIComponent(request);

  const url = `singlesource-${network.toLowerCase()}://?request=${compressed}`;
  return Linking.openURL(url);
};
