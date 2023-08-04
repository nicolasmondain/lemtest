import {

	LemtestExportOptions,
	LemtestFile,
	TemplateInstanceExports

} from '../../../@types/lemtest';

import {Exportable} from '../../modules/Exportable';
import {FilesCollection} from '../../api/FilesCollection'
import {ReactiveVar} from 'meteor/reactive-var';
import {Template} from 'meteor/templating';

import './Exports.html';
import '../Export/Export.ts';
import '../Exported/Exported';

const onDownload = (id: String):any => FilesCollection.update(id, {$inc: {downloaded: 1}});
const onChange   = (exports: ReactiveVar<[Exportable]>):LemtestExportOptions['onChange'] => () => exports.set(Exportable.getExports({onChange: onChange((this as any).exports), onDownload}, exports.get() as [Exportable]));

Template.exports.onCreated(function(this: TemplateInstanceExports) {

	this.subscribe('files');

	this.exports = new ReactiveVar([] as unknown as [Exportable]);

	this.exports.set(Exportable.getExports({onChange: onChange(this.exports), onDownload}, []));

});

Template.exports.helpers({

	exports(){

		return (Template.instance() as TemplateInstanceExports).exports.get();

	},
	update(){

		return onChange((Template.instance() as TemplateInstanceExports).exports);

	},
	files(){

		return FilesCollection.find({}).fetch();

	}

});

Template.exports.events({

	'click .js-new'() {

		try{

			const datetime  = new Date().getTime();
			const {exports} = Template.instance() as TemplateInstanceExports;
			const array     = exports.get();

			array.push(new Exportable(datetime, {

				file      : {} as LemtestFile,
				progress  : 0,
				status    : 'UNSTARTED',
				downloaded: false,
				onChange  : onChange(exports),
				onDownload

			}));

			exports.set(array);

		}catch(error){

			console.error(error);

		}

  }

});
