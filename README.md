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

```javascript

var ADPConnectionType = require('ClientCredentialsConnType')
var ADP = require('ADP');
var adp = new ADP();


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