'use strict';

function CorpDirectoryHelper(connection, apiProductInstance) {

	this.getCorpDirectory = function getCorpDirectory(opts, cb) {
		apiProductInstance.call('read', opts, cb);
	};

}

module.exports = CorpDirectoryHelper;

