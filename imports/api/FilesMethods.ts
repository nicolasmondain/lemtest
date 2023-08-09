import {LemtestFile} from '../../@types/lemtest';
import {Meteor} from 'meteor/meteor';
import {FilesCollection} from './FilesCollection';

Meteor.methods({

	'files.increment.downloaded'(_id: LemtestFile['_id']){

		return FilesCollection.update(_id as string, {$inc: {downloaded: 1}});

	}

});
