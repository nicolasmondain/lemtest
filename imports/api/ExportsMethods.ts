import {LemtestExportOptions} from '../../@types/lemtest';
import {Meteor} from 'meteor/meteor';
import {ExportsCollection} from './ExportsCollection';

Meteor.methods({

	'exports.create'({datetime, file, progress, status, downloaded}: LemtestExportOptions){

		if(!datetime || !file || !status){

			throw new Meteor.Error('Missing parameter(s)');

		}

		return ExportsCollection.insert({datetime, file, progress, status, downloaded});

	},
	'exports.update'({_id, datetime, file, progress, status, downloaded}: LemtestExportOptions){

		if(!_id){

			throw new Meteor.Error('_id is required');

		}

		return ExportsCollection.update(_id as string, {datetime, file, progress, status, downloaded});

	},
	'exports.delete'(_id: LemtestExportOptions['_id']){

		if(!_id){

			throw new Meteor.Error('_id is required');

		}

		return ExportsCollection.remove(_id as string);

	}

});
