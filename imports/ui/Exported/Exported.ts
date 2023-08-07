import {Blaze} from 'meteor/blaze';
import {FilesCollection} from '../../api/FilesCollection'
import {Template} from 'meteor/templating';

import './Exported.html';

Template.exported.onCreated(function(this: Blaze.TemplateInstance) {

	this.subscribe('files');

});

Template.exported.helpers({

	list(){

		return FilesCollection.find({}, {sort: {downloaded: -1}});

	}

});
