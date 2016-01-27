'use strict';

module.exports = {
	defaultProducts: [
		{
			className: 'UserInfo',
			calls: [{
				roleCodes: ['employee'],
				canonicalUri: 'core/v1/userinfo',
				path: '/core/v1/userinfo',
				methodName: 'read'
			}]
		}
	],
	products: [
		{
			className: 'Worker',
			calls: [{
				roleCodes: ['employee'],
				canonicalUri: 'hr/workerInformationManagement/workerManagement/workerProfileManagement/worker.read',
				methodName: 'read'
			}]
		},
		{
			className: 'TaxStatement',
			calls: [{
				roleCodes: ['employee'],
				canonicalUri: 'payroll/payrollManagement/statementManagement/payStatementViewing/payStatement.read',
				methodName: 'read'
			}]
		},
		{
			className: 'CorpDirectory',
			calls: [{
				roleCodes: ['employee'],
				canonicalUri: 'hr/organizationInformationManagement/corporateDirectoryManagement/corporateDirectoryManagement/corporateDirectory.read',
				methodName: 'read'
			}]
		}
	]
};
