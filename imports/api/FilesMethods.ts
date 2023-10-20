import {LemtestFile} from '../../@types/lemtest';
import {Meteor} from 'meteor/meteor';
import {FilesCollection} from './FilesCollection';
import SimpleSchema from 'simpl-schema';

Meteor.methods({

	'files.increment.downloaded'(_id: LemtestFile['_id']){

		try{

			const validation = new SimpleSchema({_id: String}).newContext();

			validation.validate({_id});

			if(!_id){

				throw new Meteor.Error('files.increment.downloaded.MISSING_PARAM');

			}

			return FilesCollection.update(_id as string, {$inc: {downloaded: 1}});

		}catch(error: any){

			throw new Meteor.Error(JSON.stringify(error));

		}

	}

});
