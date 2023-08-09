import {LemtestFile} from '../../@types/lemtest';
import {Meteor} from 'meteor/meteor';
import {FilesCollection} from './FilesCollection';

Meteor.methods({

	'files.increment.downloaded'(_id: LemtestFile['_id']){

		if(!_id){

			throw new Meteor.Error('_id is required');

		}

		return FilesCollection.update(_id as string, {$inc: {downloaded: 1}});

	}

});
