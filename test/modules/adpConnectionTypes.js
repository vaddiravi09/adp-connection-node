
var adp = require('../../index');
var ClientCredentialsConnType = adp.ClientCredentialsConnType;
var ConnectionFactory = adp.ADPAPIConnectionFactory;
var AuthorizationCodeConnType = adp.AuthorizationCodeConnType;

var connectionFactory = new ConnectionFactory();

//****************
//CLIENT CREDS TESTS
//****************
describe('Client Credentials Connection Type Tests', function describeCb(){

	var ccConnType = new ClientCredentialsConnType();

	it('Should allow initialization of connection type object.', function itCb(done){
		var ccInitObject = {
			clientId: 'testClientId2',
			clientSecret: 'testClientSecret2',
			apiUrl: 'testApiUrl2',
			tokenUrl: 'testTokenUrl2',
			sslCertPath: 'testSSLCertPath2',
			sslKeyPath: 'testSSLKeyPath2'
		}
		ccConnType.init(ccInitObject);
		(ccConnType.clientId).should.equal('testClientId2');
		(ccConnType.clientSecret).should.equal('testClientSecret2');
		(ccConnType.apiUrl).should.equal('testApiUrl2');
		(ccConnType.tokenUrl).should.equal('testTokenUrl2');
		(ccConnType.sslCertPath).should.equal('testSSLCertPath2');
		(ccConnType.sslKeyPath).should.equal('testSSLKeyPath2');
		done();
	});

	it('Should allow valid values for Client Id', function itCb(done){
		try{
			ccConnType.setClientId('testClientId');
			(ccConnType.clientId).should.equal('testClientId'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	


	it('Should allow valid values for Client Secret', function itCb(done){
		try{
			ccConnType.setClientSecret('testClientSecret');
			(ccConnType.clientSecret).should.equal('testClientSecret'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	


	it('Should allow valid values for API Url', function itCb(done){
		try{
			ccConnType.setApiUrl('testApiUrl');
			(ccConnType.apiUrl).should.equal('testApiUrl'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	

	it('Should allow valid values for Token Url', function itCb(done){
		try{
			ccConnType.setTokenUrl('testTokenUrl');
			(ccConnType.tokenUrl).should.equal('testTokenUrl'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	

	it('Should allow valid values for SSL Cert Path', function itCb(done){
		try{
			ccConnType.setSSLCertPath('testSSLCertPath');
			(ccConnType.sslCertPath).should.equal('testSSLCertPath'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});

	it('Should allow valid values for SSL Key Path', function itCb(done){
		try{
			ccConnType.setSSLKeyPath('testSSLKeyPath');
			(ccConnType.sslKeyPath).should.equal('testSSLKeyPath'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	

	// Exceptions tests
	it('Should only allow string values for Client Id', function itCb(done){
		try{
			ccConnType.setClientId(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should only allow string values for Client Secret', function itCb(done){
		try{
			ccConnType.setClientSecret(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should only allow string values for API Url', function itCb(done){
		try{
			ccConnType.setApiUrl(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});	
	
	it('Should only allow string values for Token Url', function itCb(done){
		try{
			ccConnType.setTokenUrl(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});	

	it('Should only allow string values for SSL Cert Path', function itCb(done){
		try{
			ccConnType.setSSLCertPath(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});		

	it('Should only allow string values for SSL Key Path', function itCb(done){
		try{
			ccConnType.setSSLKeyPath(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});	

});

//****************
//AUTH CODE TESTS
//****************
describe('Authorization Code Connection Type Tests', function describeCb(){
	var acConnType = new AuthorizationCodeConnType();

	it('Should allow initialization of connection type object.', function itCb(done){
		var acInitObject = {
			clientId: 'testClientId2',
			clientSecret: 'testClientSecret2',
			apiUrl: 'testApiUrl2',
			tokenUrl: 'testTokenUrl2',
			sslCertPath: 'testSSLCertPath2',
			sslKeyPath: 'testSSLKeyPath2',
			authorizationUrl: 'testAuthorizationUrl2',
			callbackUrl: 'testCallbackUrl2'
		}
		acConnType.init(acInitObject);
		(acConnType.clientId).should.equal('testClientId2');
		(acConnType.clientSecret).should.equal('testClientSecret2');
		(acConnType.apiUrl).should.equal('testApiUrl2');
		(acConnType.tokenUrl).should.equal('testTokenUrl2');
		(acConnType.sslCertPath).should.equal('testSSLCertPath2');
		(acConnType.sslKeyPath).should.equal('testSSLKeyPath2');
		(acConnType.callbackUrl).should.equal('testCallbackUrl2');
		(acConnType.authorizationUrl).should.equal('testAuthorizationUrl2');
		done();
	});

	it('Should set Authorization Code', function itCb(done){
		acConnType.setAuthorizationCode('testAuthCode');
		(acConnType.authorizationCode).should.equal('testAuthCode');
		done();
	});

	/*it('Should get Authorization Request Url', function itCb(done){
		var url = acConnType.getAuthorizationRequest();
		(typeof url).should.equal('string');
		done();
	});*/

	it('Should throw an exception when requesting Authorization Request Url without callbackUrl', function itCb(done){
		delete acConnType.callbackUrl;
		try{
			var url = acConnType.getAuthorizationRequest();
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should throw an exception when requesting Authorization Request Url without clientId', function itCb(done){
		delete acConnType.clientId;
		try{
			var url = acConnType.getAuthorizationRequest();
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should throw an exception when requesting Authorization Request Url without authorizationUrl', function itCb(done){
		delete acConnType.authorizationUrl;
		try{
			var url = acConnType.getAuthorizationRequest();
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should allow valid values for Authorization Url', function itCb(done){
		try{
			acConnType.setAuthorizationUrl('testAuthorizationUrl');
			(acConnType.authorizationUrl).should.equal('testAuthorizationUrl'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});

	it('Should allow valid values for Callback Url', function itCb(done){
		try{
			acConnType.setCallbackUrl('testCallbackUrl');
			(acConnType.callbackUrl).should.equal('testCallbackUrl'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});		

	it('Should allow valid values for Client Id', function itCb(done){
		try{
			acConnType.setClientId('testClientId');
			(acConnType.clientId).should.equal('testClientId'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	


	it('Should allow valid values for Client Secret', function itCb(done){
		try{
			acConnType.setClientSecret('testClientSecret');
			(acConnType.clientSecret).should.equal('testClientSecret'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	


	it('Should allow valid values for API Url', function itCb(done){
		try{
			acConnType.setApiUrl('testApiUrl');
			(acConnType.apiUrl).should.equal('testApiUrl'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	

	it('Should allow valid values for Token Url', function itCb(done){
		try{
			acConnType.setTokenUrl('testTokenUrl');
			(acConnType.tokenUrl).should.equal('testTokenUrl'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	

	it('Should allow valid values for SSL Cert Path', function itCb(done){
		try{
			acConnType.setSSLCertPath('testSSLCertPath');
			(acConnType.sslCertPath).should.equal('testSSLCertPath'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});

	it('Should allow valid values for SSL Key Path', function itCb(done){
		try{
			acConnType.setSSLKeyPath('testSSLKeyPath');
			(acConnType.sslKeyPath).should.equal('testSSLKeyPath'); 
			('No Exception.').should.equal('No Exception.');
		}catch(e) {
			('Exception Occurred.').should.equal('No Exception.');
		}
		done();
	});	

	// Exceptions tests
	it('Should only allow string values for Callback Url', function itCb(done){
		try{
			acConnType.setCallbackUrl(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should only allow string values for Authorization Url', function itCb(done){
		try{
			acConnType.setAuthorizationUrl(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should only allow string values for Client Id', function itCb(done){
		try{
			acConnType.setClientId(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should only allow string values for Client Secret', function itCb(done){
		try{
			acConnType.setClientSecret(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});

	it('Should only allow string values for API Url', function itCb(done){
		try{
			acConnType.setApiUrl(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});	
	
	it('Should only allow string values for Token Url', function itCb(done){
		try{
			acConnType.setTokenUrl(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});	

	it('Should only allow string values for SSL Cert Path', function itCb(done){
		try{
			acConnType.setSSLCertPath(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});		

	it('Should only allow string values for SSL Key Path', function itCb(done){
		try{
			acConnType.setSSLKeyPath(1);
			('No Exception.').should.equal('Exception Occurred.');
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.');
		}
		done();
	});	



});






