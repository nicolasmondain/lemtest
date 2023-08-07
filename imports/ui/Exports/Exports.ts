import {

	LemtestFile,
	LemtestExportOptions,
	TemplateInstanceExports

} from '../../../@types/lemtest';

import {Exportable} from '../../modules/Exportable';
import {Exportables} from '../../modules/Exportables';
import {ExportsCollection} from '../../api/ExportsCollection'
import {Template} from 'meteor/templating';

import './Exports.html';
import '../Export/Export.ts';

Template.exports.onCreated(function(this: TemplateInstanceExports) {

	this.subscribe('exports');

});

Template.exports.helpers({

	exports(){

		return ExportsCollection.find({}).fetch().map((exportable) => {

			if(exportable._id && Exportables[exportable._id]){

				return Exportables[exportable._id];

			}

			return new Exportable(exportable as LemtestExportOptions, Exportables);

		});

	}

});

Template.exports.events({

	'click .js-new'(){

		try{

			new Exportable({

				datetime	: new Date().getTime(),
				file      : {} as LemtestFile,
				progress  : 0,
				status    : 'UNSTARTED',
				downloaded: false

			}, Exportables);

		}catch(error){

			console.error(error);

		}

  }

});
