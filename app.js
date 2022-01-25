// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('test');
  // if (req.protocol === 'https' && typeof req.socket.getProtocol === 'function')
  // {
  //   const protocolVersion = req.socket.getProtocol()
  //   console.log(protocolVersion);
  //   if (protocolVersion != 'TLSv1.2' && protocolVersion != 'TLSv1.3')
  //   {
  //     // dbLogger.LogError('Unsupported protocol version: ' + protocolVersion, req)
  //   }
  // } else {
  //   // dbLogger.LogError('test', req);
  // }

  // // res.header('Access-Control-Allow-Origin', '*');
  // // res.header(
  // //   'Access-Control-Allow-Headers',
  // //   'Origin, X-Requested-With, Content-Type, Accept'
  // // );

  next();
});

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.post('/', (req, res) => {
  console.log(typeof req.socket);

  const body = {};
  if (typeof req.socket == 'TLSSocket')
  {
    body['tlsVersion'] = req.socket.getProtocol();
    body['tlsCipher'] = req.socket.getCipher();
    body['cipers'] = tls.getCiphers();
    // TODO: add remote peer properties
  }

  // const body = {};

  // if (req.protocol === 'https' && typeof req.socket.getProtocol === 'function')
  // {
  //   const protocolVersion = req.socket.getProtocol()
  //   console.log(protocolVersion);
  //   if (protocolVersion != 'TLSv1.2' && protocolVersion != 'TLSv1.3')
  //   {
  //     res.status(426).send('Unsupported protocol version: ' + protocolVersion).end();
  //   }
  // }

  res.status(200).send(body).end();

});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
