# ADP Connection Library

### Description
The ADP Connection library wraps the authorization (oAuth 2.0) connection steps for connecting to ADPs API gateway.

### Version
`2.0.0`

### Previous version support
`npm install adp-connection@1.1.1`

### Installation
```sh
$ npm install adp-connection
```

# Usage 
## [API Docs & Examples](docs)

### Create Client Credentials ADP Connection
```js
import adpConnection from 'adp-connection';

const connectionOpts = {
    clientId: '1234567890',
    clientSecret: 'ABC-DEF-GHI-JKL',
    granttype: 'client_credentials',
    sslCertPath: './certs/cert.pem',
    sslKeyPath: './certs/cert.key'
};
const connectionComplete = err => {
    // Use adp-core to do all the things...
};
const conn = adpConnection.createConnection(connectionOpts);
conn.connect(connectionComplete);
```

### Create Authorization Code ADP Connection

```js
import adpConnection from 'adp-connection';

const connectionOpts = {
    clientId: '1234567890',
    clientSecret: 'ABC-DEF-GHI-JKL',
    granttype: 'authorization_code',
    sslCertPath: './certs/cert.pem',
    sslKeyPath: './certs/cert.key',
    callbackUrl: 'https://myapp.domain.com/callback'
};
const conn = adpConnection.createConnection(connectionOpts);

// in an express app...
res.redirect(conn.getAuthorizationRequest());

// Authorization endpoint will respond to `https://myapp.domain.com/callback` with `code` query parameter
const authorizationCode = req.query.code;

// Set authorizationCode in connection options. 
connectionOpts.authorizationCode = authorizationCode;

// createConnection with authorizationCode set.
const conn = adpConnection.createConnection(connectionOpts);
const connectionComplete = err => {
    // connected ...
};
conn.connect(connectionComplete);
```

# Debug
Enable debugging by setting the `NODE_DEBUG` environment variable.

```sh
$ export NODE_DEBUG=adp-connection,adp-core
```

# Contributing
To contribute to the library, please generate a pull request. Before generating the pull request, please insure the following:
1. Appropriate unit tests have been updated or created.
2. Code coverage on unit tests must be no less than 100%.
3. Your code updates have been fully tested and linted with no errors. 
4. Update README and API documentation as appropriate.

# Sample Client
A sample client is provided to demonstrate usage of the libraries. The sample client connects to a sandbox environment hosted by ADP, and comes preconfigured with the necessary credentials and certificates to connect to the sandbox server.

### Authorization Code Example
```sh
$ git clone https://github.com/adplabs/adp-connection-node.git
$ cd adp-connection-node
$ npm install
$ node authorizationCodeExample
```
### Client Credentials Example
```sh
$ git clone https://github.com/adplabs/adp-connection-node.git
$ cd adp-connection-node
$ npm install
$ node clientCredentialsExample
```

# Test Execution
```sh
$ npm test
```

# Code Coverage
```sh
$ npm run coverage
```

# Lint
```sh
$ npm run lint
```

# License 
[Apache 2](http://www.apache.org/licenses/LICENSE-2.0)
