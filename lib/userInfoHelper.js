'use strict';

function UserInfoHelper(connection, apiProductInstance) {

	this.getUserInfo = function getUserInfo(opts, cb) {
		apiProductInstance.call('read', opts, cb);
	};

}

module.exports = UserInfoHelper;

