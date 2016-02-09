## Modules

<dl>
<dt><a href="#module_Authenticate">Authenticate</a></dt>
<dd><p>Factory module for producing instance of <a href="#ClientCredentialsConnection">ClientCredentialsConnection</a> OR <a href="#AuthorizationCodeConnection">AuthorizationCodeConnection</a></p>
</dd>
<dt><a href="#module_readCerts">readCerts</a> ⇒ <code>void</code></dt>
<dd><p>This module validates that the cert files exist. It also validates the file types against the config&gt;connect&gt;validCertTypes array.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#ADPAPIConnectionFactory">ADPAPIConnectionFactory</a></dt>
<dd></dd>
<dt><a href="#ADPAPIConnection">ADPAPIConnection</a></dt>
<dd></dd>
<dt><a href="#APIProduct">APIProduct</a></dt>
<dd></dd>
<dt><a href="#APIProductInstance">APIProductInstance</a></dt>
<dd></dd>
<dt><a href="#AuthorizationCodeConnection">AuthorizationCodeConnection</a></dt>
<dd></dd>
<dt><a href="#AuthorizationCodeConnectionType">AuthorizationCodeConnectionType</a></dt>
<dd></dd>
<dt><a href="#ClientCredentialsConnection">ClientCredentialsConnection</a></dt>
<dd></dd>
<dt><a href="#ClientCredentialsConnectionType">ClientCredentialsConnectionType</a></dt>
<dd></dd>
</dl>

<a name="module_Authenticate"></a>
## Authenticate
Factory module for producing instance of [ClientCredentialsConnection](#ClientCredentialsConnection) OR [AuthorizationCodeConnection](#AuthorizationCodeConnection)


| Param | Type | Description |
| --- | --- | --- |
| conn | <code>[ADPAPIConnection](#ADPAPIConnection)</code> | Connected instance of [ADPAPIConnection](#ADPAPIConnection) |

<a name="module_readCerts"></a>
## readCerts ⇒ <code>void</code>
This module validates that the cert files exist. It also validates the file types against the config>connect>validCertTypes array.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | contains cert property which is array of cert file locations. |
| cb | <code>function</code> | Function to be executed once cert files are validated or upon exception during validation. |

<a name="ADPAPIConnectionFactory"></a>
## ADPAPIConnectionFactory
**Kind**: global class  

* [ADPAPIConnectionFactory](#ADPAPIConnectionFactory)
    * [new ADPAPIConnectionFactory()](#new_ADPAPIConnectionFactory_new)
    * [.this.createConnection()](#ADPAPIConnectionFactory.this.createConnection) ⇒

<a name="new_ADPAPIConnectionFactory_new"></a>
### new ADPAPIConnectionFactory()
contains factory method for producing instances of ADPConnection

<a name="ADPAPIConnectionFactory.this.createConnection"></a>
### ADPAPIConnectionFactory.this.createConnection() ⇒
Factory method for producing instances of ADPConnection

**Kind**: static method of <code>[ADPAPIConnectionFactory](#ADPAPIConnectionFactory)</code>  
**Returns**: instance of [ADPAPIConnection](#ADPAPIConnection)  
<a name="ADPAPIConnection"></a>
## ADPAPIConnection
**Kind**: global class  

* [ADPAPIConnection](#ADPAPIConnection)
    * [new ADPAPIConnection()](#new_ADPAPIConnection_new)
    * [.this.init(connType)](#ADPAPIConnection.this.init) ⇒ <code>void</code>
    * [.this.connect(_opts, cb)](#ADPAPIConnection.this.connect) ⇒ <code>void</code>
    * [.this.disconnect()](#ADPAPIConnection.this.disconnect) ⇒ <code>boolean</code>

<a name="new_ADPAPIConnection_new"></a>
### new ADPAPIConnection()
Connection object for access to ADP APIs.

<a name="ADPAPIConnection.this.init"></a>
### ADPAPIConnection.this.init(connType) ⇒ <code>void</code>
Initialize the connection with instance of Connection type

**Kind**: static method of <code>[ADPAPIConnection](#ADPAPIConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| connType | <code>ConnectionType</code> | Connection Type should be [ClientCredentialsConnectionType](#ClientCredentialsConnectionType) OR [AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType) |

<a name="ADPAPIConnection.this.connect"></a>
### ADPAPIConnection.this.connect(_opts, cb) ⇒ <code>void</code>
Connect to ADP. This step is required to obtain the access token which is required to make API calls.

**Kind**: static method of <code>[ADPAPIConnection](#ADPAPIConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| _opts | <code>object</code> | Object literal. Deprecated |
| cb | <code>function</code> | Callback function to execute upon successful connection or upon exception during connection routine. |

<a name="ADPAPIConnection.this.disconnect"></a>
### ADPAPIConnection.this.disconnect() ⇒ <code>boolean</code>
Disconnect this instance of APIAPIConnection. This method will disconnect revoke the access token.

**Kind**: static method of <code>[ADPAPIConnection](#ADPAPIConnection)</code>  
**Returns**: <code>boolean</code> - disconnected  
<a name="APIProduct"></a>
## APIProduct
**Kind**: global class  

* [APIProduct](#APIProduct)
    * [.this.init(opts, cb)](#APIProduct.this.init) ⇒ <code>void</code>
    * [.this.apiProduct(connection, productName)](#APIProduct.this.apiProduct) ⇒ <code>[APIProductInstance](#APIProductInstance)</code>

<a name="APIProduct.this.init"></a>
### APIProduct.this.init(opts, cb) ⇒ <code>void</code>
Initializes the APIProduct instance by finding mapped API Products supported by ADP.

**Kind**: static method of <code>[APIProduct](#APIProduct)</code>  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Deprecated |
| cb | <code>function</code> | Function to be executed upon successful initialization or upon exception during initialization. |

<a name="APIProduct.this.apiProduct"></a>
### APIProduct.this.apiProduct(connection, productName) ⇒ <code>[APIProductInstance](#APIProductInstance)</code>
Returns instance of [APIProductInstance](#APIProductInstance)

**Kind**: static method of <code>[APIProduct](#APIProduct)</code>  
**Returns**: <code>[APIProductInstance](#APIProductInstance)</code> - APIProductInstance  Instance of [APIProductInstance](#APIProductInstance)  

| Param | Type | Description |
| --- | --- | --- |
| connection | <code>[ADPAPIConnection](#ADPAPIConnection)</code> | Connected instance of [ADPAPIConnection](#ADPAPIConnection) |
| productName | <code>string</code> | mapped API Product name. |

<a name="APIProductInstance"></a>
## APIProductInstance
**Kind**: global class  
<a name="APIProductInstance.this.call"></a>
### APIProductInstance.this.call(method, cb)
Abstracted method to call available `methods` API Products mapped in the instances of [APIProduct](#APIProduct).

**Kind**: static method of <code>[APIProductInstance](#APIProductInstance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | Method name. See example below. |
| cb | <code>function</code> | Function to execute upon response from method call. |

**Example**  
```js
APIProductInstance.call('read', callbackFunction);
```
<a name="AuthorizationCodeConnection"></a>
## AuthorizationCodeConnection
**Kind**: global class  

* [AuthorizationCodeConnection](#AuthorizationCodeConnection)
    * [new AuthorizationCodeConnection(conn)](#new_AuthorizationCodeConnection_new)
    * [.this.connect()](#AuthorizationCodeConnection.this.connect) ⇒ <code>void</code>
    * [.this.setTokenExpiration(token)](#AuthorizationCodeConnection.this.setTokenExpiration) ⇒ <code>void</code>

<a name="new_AuthorizationCodeConnection_new"></a>
### new AuthorizationCodeConnection(conn)

| Param | Type | Description |
| --- | --- | --- |
| conn | <code>[ADPAPIConnection](#ADPAPIConnection)</code> | Connected instance of [ADPAPIConnection](#ADPAPIConnection) |

<a name="AuthorizationCodeConnection.this.connect"></a>
### AuthorizationCodeConnection.this.connect() ⇒ <code>void</code>
Initiates the connection flow for `authorization_code` grant type.

**Kind**: static method of <code>[AuthorizationCodeConnection](#AuthorizationCodeConnection)</code>  
<a name="AuthorizationCodeConnection.this.setTokenExpiration"></a>
### AuthorizationCodeConnection.this.setTokenExpiration(token) ⇒ <code>void</code>
Sets the token expiration based on the epiration sent from the token end point.

**Kind**: static method of <code>[AuthorizationCodeConnection](#AuthorizationCodeConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>object</code> | Token response object. |

<a name="AuthorizationCodeConnectionType"></a>
## AuthorizationCodeConnectionType
**Kind**: global class  

* [AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)
    * [.this.setCallbackUrl(val)](#AuthorizationCodeConnectionType.this.setCallbackUrl) ⇒ <code>void</code>
    * [.this.setSSLCertPath(val)](#AuthorizationCodeConnectionType.this.setSSLCertPath) ⇒ <code>void</code>
    * [.this.setSSLKeyPath(val)](#AuthorizationCodeConnectionType.this.setSSLKeyPath) ⇒ <code>void</code>
    * [.this.setClientId(val)](#AuthorizationCodeConnectionType.this.setClientId) ⇒ <code>void</code>
    * [.this.setClientSecret(val)](#AuthorizationCodeConnectionType.this.setClientSecret) ⇒ <code>void</code>
    * [.this.setTokenUrl(val)](#AuthorizationCodeConnectionType.this.setTokenUrl) ⇒ <code>void</code>
    * [.this.setAuthorizationUrl(val)](#AuthorizationCodeConnectionType.this.setAuthorizationUrl) ⇒ <code>void</code>
    * [.this.setApiUrl(val)](#AuthorizationCodeConnectionType.this.setApiUrl) ⇒ <code>void</code>
    * [.this.setAuthorizationCode(authCode)](#AuthorizationCodeConnectionType.this.setAuthorizationCode) ⇒ <code>void</code>
    * [.this.getAuthorizationRequest()](#AuthorizationCodeConnectionType.this.getAuthorizationRequest) ⇒ <code>string</code>
    * [.this.init(initializationObject)](#AuthorizationCodeConnectionType.this.init) ⇒ <code>void</code>

<a name="AuthorizationCodeConnectionType.this.setCallbackUrl"></a>
### AuthorizationCodeConnectionType.this.setCallbackUrl(val) ⇒ <code>void</code>
Set value for Callback Url configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Callback Url. |

<a name="AuthorizationCodeConnectionType.this.setSSLCertPath"></a>
### AuthorizationCodeConnectionType.this.setSSLCertPath(val) ⇒ <code>void</code>
Set value for SSL Cert Path configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the path to the SSL Cert File. |

<a name="AuthorizationCodeConnectionType.this.setSSLKeyPath"></a>
### AuthorizationCodeConnectionType.this.setSSLKeyPath(val) ⇒ <code>void</code>
Set value for SSL Key Path configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the path to the SSL Key File. |

<a name="AuthorizationCodeConnectionType.this.setClientId"></a>
### AuthorizationCodeConnectionType.this.setClientId(val) ⇒ <code>void</code>
Set value for Client Id configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Client Id value. |

<a name="AuthorizationCodeConnectionType.this.setClientSecret"></a>
### AuthorizationCodeConnectionType.this.setClientSecret(val) ⇒ <code>void</code>
Set value for Client Secret configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Client Secret value. |

<a name="AuthorizationCodeConnectionType.this.setTokenUrl"></a>
### AuthorizationCodeConnectionType.this.setTokenUrl(val) ⇒ <code>void</code>
Set value for Token Url configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Token Url value. |

<a name="AuthorizationCodeConnectionType.this.setAuthorizationUrl"></a>
### AuthorizationCodeConnectionType.this.setAuthorizationUrl(val) ⇒ <code>void</code>
Set value for Authorization Url configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Authorization Url value. |

<a name="AuthorizationCodeConnectionType.this.setApiUrl"></a>
### AuthorizationCodeConnectionType.this.setApiUrl(val) ⇒ <code>void</code>
Set value for API Url configuration option.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the API Url value. |

<a name="AuthorizationCodeConnectionType.this.setAuthorizationCode"></a>
### AuthorizationCodeConnectionType.this.setAuthorizationCode(authCode) ⇒ <code>void</code>
Set the authorization code value, once received.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| authCode | <code>string</code> | String representing the Authorization Code. |

<a name="AuthorizationCodeConnectionType.this.getAuthorizationRequest"></a>
### AuthorizationCodeConnectionType.this.getAuthorizationRequest() ⇒ <code>string</code>
Helper function to return the authorization endpoint + query string parameters for making an authorization code request.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  
**Returns**: <code>string</code> - url  Url to perform redirect to authorization end point.  
<a name="AuthorizationCodeConnectionType.this.init"></a>
### AuthorizationCodeConnectionType.this.init(initializationObject) ⇒ <code>void</code>
Initialize the connection type object.

**Kind**: static method of <code>[AuthorizationCodeConnectionType](#AuthorizationCodeConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| initializationObject | <code>object</code> | Object literal with values for some or all configuration objects. |

<a name="ClientCredentialsConnection"></a>
## ClientCredentialsConnection
**Kind**: global class  

* [ClientCredentialsConnection](#ClientCredentialsConnection)
    * [new ClientCredentialsConnection(conn)](#new_ClientCredentialsConnection_new)
    * [.this.connect()](#ClientCredentialsConnection.this.connect) ⇒ <code>void</code>
    * [.this.setTokenExpiration(token)](#ClientCredentialsConnection.this.setTokenExpiration) ⇒ <code>void</code>

<a name="new_ClientCredentialsConnection_new"></a>
### new ClientCredentialsConnection(conn)

| Param | Type | Description |
| --- | --- | --- |
| conn | <code>[ADPAPIConnection](#ADPAPIConnection)</code> | Connected instance of [ADPAPIConnection](#ADPAPIConnection) |

<a name="ClientCredentialsConnection.this.connect"></a>
### ClientCredentialsConnection.this.connect() ⇒ <code>void</code>
Initiates the connection flow for `authorization_code` grant type.

**Kind**: static method of <code>[ClientCredentialsConnection](#ClientCredentialsConnection)</code>  
<a name="ClientCredentialsConnection.this.setTokenExpiration"></a>
### ClientCredentialsConnection.this.setTokenExpiration(token) ⇒ <code>void</code>
Sets the token expiration based on the epiration sent from the token end point.

**Kind**: static method of <code>[ClientCredentialsConnection](#ClientCredentialsConnection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>object</code> | Token response object. |

<a name="ClientCredentialsConnectionType"></a>
## ClientCredentialsConnectionType
**Kind**: global class  

* [ClientCredentialsConnectionType](#ClientCredentialsConnectionType)
    * [.this.setSSLCertPath(val)](#ClientCredentialsConnectionType.this.setSSLCertPath) ⇒ <code>void</code>
    * [.this.setSSLKeyPath(val)](#ClientCredentialsConnectionType.this.setSSLKeyPath) ⇒ <code>void</code>
    * [.this.setClientId(val)](#ClientCredentialsConnectionType.this.setClientId) ⇒ <code>void</code>
    * [.this.setClientSecret(val)](#ClientCredentialsConnectionType.this.setClientSecret) ⇒ <code>void</code>
    * [.this.setTokenUrl(val)](#ClientCredentialsConnectionType.this.setTokenUrl) ⇒ <code>void</code>
    * [.this.setApiUrl(val)](#ClientCredentialsConnectionType.this.setApiUrl) ⇒ <code>void</code>
    * [.this.init(initializationObject)](#ClientCredentialsConnectionType.this.init) ⇒ <code>void</code>

<a name="ClientCredentialsConnectionType.this.setSSLCertPath"></a>
### ClientCredentialsConnectionType.this.setSSLCertPath(val) ⇒ <code>void</code>
Set value for SSL Cert Path configuration option.

**Kind**: static method of <code>[ClientCredentialsConnectionType](#ClientCredentialsConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the path to the SSL Cert File. |

<a name="ClientCredentialsConnectionType.this.setSSLKeyPath"></a>
### ClientCredentialsConnectionType.this.setSSLKeyPath(val) ⇒ <code>void</code>
Set value for SSL Key Path configuration option.

**Kind**: static method of <code>[ClientCredentialsConnectionType](#ClientCredentialsConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the path to the SSL Key File. |

<a name="ClientCredentialsConnectionType.this.setClientId"></a>
### ClientCredentialsConnectionType.this.setClientId(val) ⇒ <code>void</code>
Set value for Client Id configuration option.

**Kind**: static method of <code>[ClientCredentialsConnectionType](#ClientCredentialsConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Client Id value. |

<a name="ClientCredentialsConnectionType.this.setClientSecret"></a>
### ClientCredentialsConnectionType.this.setClientSecret(val) ⇒ <code>void</code>
Set value for Client Secret configuration option.

**Kind**: static method of <code>[ClientCredentialsConnectionType](#ClientCredentialsConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Client Secret value. |

<a name="ClientCredentialsConnectionType.this.setTokenUrl"></a>
### ClientCredentialsConnectionType.this.setTokenUrl(val) ⇒ <code>void</code>
Set value for Token Url configuration option.

**Kind**: static method of <code>[ClientCredentialsConnectionType](#ClientCredentialsConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the Token Url value. |

<a name="ClientCredentialsConnectionType.this.setApiUrl"></a>
### ClientCredentialsConnectionType.this.setApiUrl(val) ⇒ <code>void</code>
Set value for API Url configuration option.

**Kind**: static method of <code>[ClientCredentialsConnectionType](#ClientCredentialsConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | String representing the API Url value. |

<a name="ClientCredentialsConnectionType.this.init"></a>
### ClientCredentialsConnectionType.this.init(initializationObject) ⇒ <code>void</code>
Initialize the connection type object.

**Kind**: static method of <code>[ClientCredentialsConnectionType](#ClientCredentialsConnectionType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| initializationObject | <code>object</code> | Object literal with values for some or all configuration objects. |

