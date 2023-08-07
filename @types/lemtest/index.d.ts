import {Blaze} from 'meteor/blaze';
import {ReactiveVar} from 'meteor/reactive-var';

import {Exportable} from '../../imports/modules/Exportable.js';

export type LemtestFile = {

	_id       : string;
	name      : string;
	url       : string;
	downloaded: number;

}

export type LemtestExportOptions = {

	_id?      : string;
	datetime  : number;
	file      : LemtestFile;
	progress	: number;
	status		: 'UNSTARTED'|'PROGRESS'|'STOPPED'|'PAUSED'|'CANCELED'|'FINISHED';
	downloaded: boolean;

}

export type TemplateInstanceExports = Blaze.TemplateInstance<{}> & {

	exports: ReactiveVar<Exportable[]>;

};

