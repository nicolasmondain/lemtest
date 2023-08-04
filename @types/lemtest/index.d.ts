import {Blaze} from 'meteor/blaze';
import {ReactiveVar} from 'meteor/reactive-var';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Exportable} from '../../imports/modules/Exportable.js';

export type LemtestFile = {

	_id       : string;
	name      : string;
	url       : string;
	downloaded: number;

}

export type LemtestExportOptions = {

	file      : LemtestFile;
	progress	: number;
	status		: 'UNSTARTED'|'PROGRESS'|'STOPPED'|'PAUSED'|'CANCELED'|'FINISHED';
	downloaded: boolean;
	onChange  : () => void;
	onDownload: (_id: string) => number;

}

export type LemtestExportMethods = {

	onChange  : LemtestExportOptions['onChange'];
	onDownload: LemtestExportOptions['onDownload'];

}

export type TemplateInstanceExport = Blaze.TemplateInstance<{}> & {

	export: ReactiveVar<Exportable>;
	update: ReactiveVar<LemtestExportOptions['onChange']>;

};

export type TemplateInstanceExports = Blaze.TemplateInstance<{}> & {

	exports: ReactiveVar<[Exportable]>;
	state  : ReactiveDict<{}>;

};


