# NodeJS APIClient 


### Installation / Execution 
```sh
$ npm install
$ node client.js
```

### Full API Documentation (JSDoc)
g
[Current Documentation can be found here.](docs/)

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