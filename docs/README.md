# ADP Connection API

* [Connection](#connection)
    * [createConnection](#createConnection)

* [ADPConnection](#adp-connection)
    * [connect](#connect)
    * [disconnect](#disconnect)
    * [getExpiration](#getexpiration)
    * [isConnected](#isconnected)
    * [getReconnectionObject](#getreconnectionobject)
    * [reconnect](#reconnect)
    * [getAuthorizationRequest](#getauthorizationrequest)

# Connection

## createConnection
---
#### Description 
Returns handle to `ADPConnection` instance. 

#### Params
* Options {Object} - Connection configuration object.
 
##### Supported Configuration Options
---
|Property   |Description   |
|------|-----|
|`clientId`|Client Identifier - provided by ADP.|
|`clientSecret`|Client Secret - provided by ADP.|
|`sslCertPath`|Path to your ADP cert file|
|`sslKeyPath`|Path to your ADP key file|
|`granttype`|Valid values are `client_credentials` or `authorization_code`|
|`callBackUrl`|URL which will receive OAuth2.0 Authorization Code. Required for `authorization_code` grant type only.|
|`authorizationCode`|Code sent by ADP during the `authorization_code` flow. Required for `authorization_code` grant type only.|
|`tokenUrl`|Override default URL for posting access token requests.|
|`authorizationUrl`|Override default URL for receiving authorization code from ADP Gateway.|
|`apiUrl`|Override default URL for accessing ADP APIs.|


#### Returns
* ADPConnection {Object} - Ready-to-connect instance of `ADPConnection` based on the input configuration `options` passed.

#### Example

```js
import adpConnection from 'adp-connection';

const connectionOpts = {
    clientId: '1234567890',
    clientSecret: 'ABC-DEF-GHI-JKL',
    granttype: 'client_credentials',
    sslCertPath: './certs/cert.pem',
    sslKeyPath: './certs/cert.key'
};

const conn = adpConnection.createConnection(connectionOpts);
// ready to connect.
```

---
---
---
---
# ADP Connection

## connect
---
#### Description 
Connect using configuration passed into `createConnection`.

#### Params
* Callback {Function} - Callback to be executed once connection is initialized. Passes back error containing any connection exceptions.

#### Example
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

## disconnect
---

#### Description 
Use this method to disconnect a connected instance of `ADPConnection`.

#### Params
* None

#### Returns
* {Boolean}

#### Example

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
    // oops! Didn't mean to do that.
    conn.disconnect();
};
const conn = adpConnection.createConnection(connectionOpts);
conn.connect(connectionComplete);
```


## getExpiration
---
#### Description 
Use this method to get the connection expiration. 

#### Params
* None

#### Example

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
    const expirationDate = conn.getExpiration();
    expirationDate; // Wed Aug 17 2016 18:13:39 GMT-0400 (EDT)
};
const conn = adpConnection.createConnection(connectionOpts);
conn.connect(connectionComplete);
```

## isConnected
---

#### Description 
Use this method to determine the current state of the connection. True/False value based on connection expiration.

#### Params
* None

#### Example

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
    const isConnected = conn.isConnected();
    isConnected; // true
};
const conn = adpConnection.createConnection(connectionOpts);
conn.connect(connectionComplete);
```

## getReconnectionObject
---
#### Description 
Use this method to obtain a reconnection object so you can reconnect later. This is ideal for clustered server environments.

#### Params
* None
 
#### Returns 
* Reconnection Object {Object} - Reconnection object for use with `.reconnect()` method.

#### Example

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
    const reconnectionObj = conn.getReconnectionObject();
    // Save me in redis or other store for clustered environments.
    // Pass me to .reconnect() to reestablish a valid connection.
};
const conn = adpConnection.createConnection(connectionOpts);
conn.connect(connectionComplete);
```

## reconnect
---
#### Description 
Use this method to reconnect a previously established ADP connection object. 

#### Params
* Reconnection Object {Object} - Obtain by calling `.getReconnectionObject()` on an established ADP connection object. 

#### Example

```js
import adpConnection from 'adp-connection';

const connectionOpts = {
    clientId: '1234567890',
    clientSecret: 'ABC-DEF-GHI-JKL',
    granttype: 'client_credentials',
    sslCertPath: './certs/cert.pem',
    sslKeyPath: './certs/cert.key'
};
const conn = adpConnection.createConnection(connectionOpts);
conn.connect(err => {
    const reconnectionObj = conn.getReconnectionObject();
    // Save me in redis.
});

// ... a few minutes later ...

const conn = adpConnection.createConnection({}); // 
// get reconnection object from redis.
conn.reconnect(reconnectionObj);
// Use adp-core to do all the things...
```

## getAuthorizationRequest
-----------
#### Description 
Use this method to obtain the complete authorization request URL with parameters populated based on the configuration passed into `.createConnection`.

#### Params
* None

### Returns
* Authorization URL {String} - Authorization URL with query parameters populated.

#### Example

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
```

