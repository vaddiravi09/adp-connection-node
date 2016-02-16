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

### Create Authorization Code ADP Connection
```javascript
var express = require('express');
var router = express.Router();
var connection;

/**
	1. CREATE CONNECTION CONFIGURAITON OBJECT (AuthorizationCodeConnType)
	2. INITIALIZE CONFIG OBJECT
	3. CREATE CONNECTION OBJECT
	4. INITIALIZE CONNECTION OBJECT WITH CONFIG OBJECT. 
	5. OBTAIN AUTHORIZATION REQUEST URL.
	6. REDIRECT. 
*/
router.get('/authenticate', function login(req, res) {
	var connType = new AuthorizationCodeConnType();
	var initObject = {
		clientId: 'ec762f06-7410-4f6d-aa82-969902c1836a',
		clientSecret: '6daf2cd7-4604-46c0-ab43-a645a6571d34',
		apiUrl: 'https://iat-api.adp.com',
		tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
		authorizationUrl: 'https://iat-accounts.adp.com/auth/oauth/v2/authorize',
		sslKeyPath: 'iatCerts/iat.key',
		sslCertPath: 'iatCerts/iat.pem',
		callbackUrl: 'http://localhost:8889/callback'
	};
	connType.init(initObject);
	var connectionFactory = new ConnectionFactory();
	connection = connectionFactory.createConnection('authorization_code');
	connection.init(connType);

	var url = connection.getAuthorizationRequest();
	console.log('URL', url);
	res.redirect(url);
});

/**
	7. AUTHORIZATION RESPONSE RECEIVED.
	8. OBTAIN AUTHORIZATION CODE FROM QUERY PARAM.
	9. OBTAIN STATE FROM QUERY PARAM.
	10. SET AUTHORIZATION CODE IN CONNECTION CONFIGURATION.
	11. CONNECT.
*/
router.get('/callback', function callback(req, res){
	var state = req.query.state;
	var code = req.query.code;
	if(!code) {
		log.error('Error, no authorization code received');
	}

	connection.connType.setAuthorizationCode(code);
	connection.connect(null, function connectCb(err){
		if(err) {
			log.error('Connection failed!');
		} else {
			// Connected!!
		}
	});
});

```
