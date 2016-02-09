'use strict';

module.exports = {
	products: [
		{
			productName: 'UserInfo',
			calls: [{
				path: '/core/v1/userinfo',
				methodName: 'read'
			}]
		},
		{
			productName: 'Worker',
			calls: [{
				path: '/hr/v1/workers/{associateoid}',
				methodName: 'read'
			}]
		},
		{
			productName: 'TaxStatement',
			calls: [{
				path: '/v1_0/O/A/payStatements?numberoflastpaydates=26',
				methodName: 'read'
			}]
		},
		{
			productName: 'CorpDirectory',
			calls: [{
				path: '/v1_0/O/corporateContacts',
				methodName: 'read'
			}]
		}
	]
};
