# NodeJS APIClient 

> "A sweet api client." - Abraham Lincoln



[![forthebadge](http://forthebadge.com/images/badges/uses-badges.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)
### Installation / Execution 


```sh
$ npm install
$ node client.js
```

# TODOs

### Short-term
* `lib/adp.js`
    1. Create pre-connection validation that verifies configuration before attempting connection routine.
* Create `lib/post.js` to handle posts. 
* `lib/authenticate.js` 
    1. `ADP.getAccessToken()` will be changed to use `lib/post.js` module for token access request.
* Investigate and resolve issues when making API calls with Bearer access token. 
* Better error handling for API failures. 
* Better error handling for invalid API Product calls. (i.e.; `PayStatement.read` is called but not mapped for the current userprofile/session.)
* Replace `lib/tmpMap.js` with an API call to Marketplace. Store in mongo. 
* Add tests. 
* Add code coverage. 
* Refresh access token before epiration.

### Long-term
* Support POST method API calls. 
* Support all grant types. 
* Support Meta.
* Manage session