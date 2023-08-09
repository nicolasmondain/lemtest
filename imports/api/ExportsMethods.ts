import {LemtestExportOptions} from '../../@types/lemtest';
import {Meteor} from 'meteor/meteor';
import {ExportsCollection} from './ExportsCollection';

Meteor.methods({

	'exports.create'({datetime, file, progress, status, downloaded}: LemtestExportOptions){

		return ExportsCollection.insert({datetime, file, progress, status, downloaded});

	},
	'exports.update'({_id, datetime, file, progress, status, downloaded}: LemtestExportOptions){

		return ExportsCollection.update(_id as string, {datetime, file, progress, status, downloaded});

	},
	'exports.delete'(_id: LemtestExportOptions['_id']){

		return ExportsCollection.remove(_id as string);

	}

});
