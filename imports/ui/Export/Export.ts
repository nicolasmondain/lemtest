import {

	LemtestExportMethods,
	TemplateInstanceExport

} from '../../../@types/lemtest';

import {Exportable} from '../../modules/Exportable';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './Export.html';

Template.export.onCreated(function(this: TemplateInstanceExport) {

	this.export = new ReactiveVar({} as Exportable);
	this.update = new ReactiveVar({} as LemtestExportMethods['onChange']);

});


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

			const total  = this.files.length;
			const random = Math.floor(Math.random() * total);
			const file	 = this.files[random];

			this.export.updateFile(file);

		}catch(error){

			console.error(error);

		}

  },
	'click .js-stop'(){this.export.stop()},
	'click .js-pause'(){this.export.pause()},
	'click .js-cancel'(){this.export.cancel()},
	'click .js-delete'(){this.export.delete()},
	'click .js-download'(){this.export.download()}

});
