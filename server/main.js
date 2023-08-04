import {Meteor} from 'meteor/meteor';
import {FilesCollection} from '../imports/api/FilesCollection';

const DEFAULT_FILES = [

	{url: 'https://www.lempire.com/',  name: 'lempire',  downloaded: 0},
	{url: 'https://www.lemlist.com/',  name: 'lemlist',  downloaded: 0},
	{url: 'https://www.lemverse.com/', name: 'lemverse', downloaded: 0},
	{url: 'https://www.lemstash.com/', name: 'lemstash', downloaded: 0}

];

Meteor.startup(async() => {

	if(await FilesCollection.find().countAsync() === 0){

		Promise.all(DEFAULT_FILES.map((file) => FilesCollection.insertAsync(file))).then(() => {

			Meteor.publish('files', () => FilesCollection.find());

		});

	}

});
