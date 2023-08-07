import {Meteor} from 'meteor/meteor';
import {ExportsCollection} from '../imports/api/ExportsCollection';
import {FilesCollection} from '../imports/api/FilesCollection';

const DEFAULT_FILES = [

	{url: 'https://www.lempire.com/',  name: 'lempire',  downloaded: 0},
	{url: 'https://www.lemlist.com/',  name: 'lemlist',  downloaded: 0},
	{url: 'https://www.lemverse.com/', name: 'lemverse', downloaded: 0},
	{url: 'https://www.lemstash.com/', name: 'lemstash', downloaded: 0}

];

Meteor.startup(async() => {

	if(FilesCollection.find().count() === 0){

		DEFAULT_FILES.forEach((file) => FilesCollection.insert(file));

	}

	Meteor.publish('files', () => FilesCollection.find());
	Meteor.publish('exports', () => ExportsCollection.find());

});
