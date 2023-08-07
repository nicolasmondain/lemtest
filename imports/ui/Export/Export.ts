import {LemtestFile} from '../../../@types/lemtest';
import {Template} from 'meteor/templating';
import {FilesCollection} from '/imports/api/FilesCollection';

import './Export.html';

Template.export.helpers({

	canStart(){

		return this.export.canStart() ? {} : {disabled: 'disabled'};

	},
	canStop(){

		return this.export.canStop() ? {} : {disabled: 'disabled'};

	},
	canPause(){

		return this.export.canPause() ? {} : {disabled: 'disabled'};

	},
	canCancel(){

		return this.export.canCancel() ? {} : {disabled: 'disabled'};

	},
	canDelete(){

		return this.export.canDelete() ? {} : {disabled: 'disabled'};

	},
	canDownload(){

		return this.export.canDownload() ? {} : {disabled: 'disabled'};

	}

});

Template.export.events({

	async 'click .js-start'() {

		try{

			await this.export.start();

			const files  = FilesCollection.find({}).fetch();
			const total  = files.length;
			const random = Math.floor(Math.random() * total);
			const file	 = files[random];

			this.export.updateFile(file as LemtestFile);

		}catch(error){

			console.error(error);

		}

  },
	'click .js-stop'(){this.export.stop()},
	'click .js-pause'(){this.export.pause()},
	'click .js-delete'(){this.export.delete()},
	'click .js-download'(){this.export.download()}

});
