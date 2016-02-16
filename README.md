# NodeJS APIClient 

### Installation / Execution 
```sh
$ npm install
$ node client.js
```

### [View HTML Docs](docs/)

# Useful Commands

### Generate Documentation (JSDoc)
```sh
$ npm run docs
```

### Test Execution
```sh
$ npm test
```

### Code Coverage
```sh
$ npm run coverage
```

### Lint
```sh
$ npm run lint
```

# Examples 


### Create Client Credentials ADP Connection
```javascript

var adp = require('adp');
var ConnectionFactory = adp.ADPAPIConnectionFactory;
var ClientCredentialsConnType = adp.ClientCredentialsConnType;
var connType = new ClientCredentialsConnType();
var initObject = {
	clientId: 'ec762f06-7410-4f6d-aa82-969902c1836a',
	clientSecret: '6daf2cd7-4604-46c0-ab43-a645a6571d34',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	sslKeyPath: 'iatCerts/iat.key',
	sslCertPath: 'iatCerts/iat.pem',
};
connType.init(initObject);

var connection = connectionFactory.createConnection('client_credentials');
connection.init(connType);
connection.connect({keepAlive: true}, function connectCb(err){
	if(err) {
		log.error('Connection failed!');
	} else {
		// Connected!
	}
	
});

```

# TODOs

### Known bugs
* Token refresh for Client Credentials does not pass refreshed auth token back to connection object. 

### Short-term
* Config connection profile as an option. 
	* Should point to path for connection config. 
* Better error handling for API failures. 
* Replace `lib/tmpMap.js` with an API call to Marketplace. Store in mongo. 
* Add tests. 
	* Should test from a module level.
* Add code coverage. 

### Long-term
* Support POST method API calls. 
* Support all saml2 connection/bearer. 
* Support Meta.

### Out of scope
* Manage session
* Manage user data between sessions