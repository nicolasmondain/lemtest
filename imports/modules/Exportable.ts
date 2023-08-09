import {LemtestFile, LemtestExportOptions} from '../../@types/lemtest';
import c from './Exportable.constants';
import {Meteor} from 'meteor/meteor';

export class Exportable{

	_id			  : LemtestExportOptions['_id'];
	datetime  : LemtestExportOptions['datetime'];
	progress  : LemtestExportOptions['progress'];
	status    : LemtestExportOptions['status'];
	downloaded: LemtestExportOptions['downloaded'];
	file      : LemtestFile;
	interval  : any;

	constructor(options = c.DEFAULT_OPTIONS as LemtestExportOptions, register: Record<string, Exportable>){

		this._id        = options._id ?? c.DEFAULT_ID;
		this.datetime   = options.datetime ?? c.DEFAULT_DATETIME;
		this.progress   = typeof options.progress === 'number' && options.progress >= c.DEFAULT_PROGRESS && options.progress <= c.PROGRESS_MAX ? options.progress : c.DEFAULT_PROGRESS;
		this.status     = c.STATUSES.includes(options.status) ? options.status : c.DEFAULT_STATUS;
		this.downloaded = options.downloaded === true;
		this.file       = options.file ?? c.DEFAULT_FILE;
		this.interval   = null;

		if(!this._id){

			this._id = Meteor.call('exports.create', {

				datetime  : this.datetime,
				file      : this.file,
				progress  : this.progress,
				status    : this.status,
				downloaded: this.downloaded

			}, (errorResponse: Meteor.Error) => {

				if(errorResponse){

					console.log(errorResponse.error);

				}

			});

		}

		if(this.status === c.STATUS_PROGRESS){

			const FORCE = true;

			this.start(FORCE);

		}

		register[this._id as string] = this;

	}

	start(force: boolean): Promise<void>{

		return new Promise((resolve, reject) => {

			try{

				if(this.status === c.STATUS_PROGRESS && !force){

					resolve();

					return;

				};

				this.status   = c.STATUS_PROGRESS;
				this.interval = window.setInterval(() => {

					this.progress += c.PROGRESS_AVERAGE;

					this.updateMongo();

					if(this.progress >= c.PROGRESS_MAX){

						this.status = c.STATUS_FINISHED;

						this.clearInterval();
						this.updateMongo();

						resolve();

					}

				}, c.PROGRESS_INTERVAL);

			}catch(error){

				reject(error);

			}

		});

	}

	stop():void{

		if(this.status === c.STATUS_STOPPED) return;

		this.status   = c.STATUS_STOPPED;
		this.progress = 0;

		this.clearInterval();
		this.updateMongo();

	}

	pause():void{

		if(this.status === c.STATUS_PAUSED) return;

		this.status = c.STATUS_PAUSED;

		this.clearInterval();
		this.updateMongo();

	}

	delete():void{

		const DELETE = true;

		this.clearInterval();
		this.updateMongo(DELETE);

	}

	download():void{

		try{

			const {file} = this;

			if(file._id){

				Meteor.call('files.increment.downloaded', file._id, (errorResponse: Meteor.Error) => {

					if(errorResponse){

						console.log(errorResponse.error);

					}

				});

				const link    = document.createElement('a');
				const content = JSON.stringify(file);
				const blob    = new Blob([content], {type: 'text/plain'});

				link.href     = URL.createObjectURL(blob);
				link.download = file.name;

				link.click();

				this.downloaded = true;
				this.updateMongo();

			}

		}catch(error){

			console.log(error);

		}

	}

	canStart():boolean{

		return this.status === c.STATUS_UNSTARTED || this.status === c.STATUS_PAUSED || this.status === c.STATUS_STOPPED;

	}

	canStop():boolean{

		return this.status === c.STATUS_PROGRESS || this.status === c.STATUS_PAUSED;

	}

	canPause():boolean{

		return this.status === c.STATUS_PROGRESS;

	}

	canCancel():boolean{

		return this.status !== c.STATUS_CANCELED && this.status !== c.STATUS_FINISHED;

	}

	canDelete():boolean{

		return this.status === c.STATUS_CANCELED || this.status === c.STATUS_FINISHED || this.status === c.STATUS_UNSTARTED;

	}

	canDownload():boolean{

		return this.status === c.STATUS_FINISHED;

	}

	roundProgress():number{

		return Math.round(this.progress);

	}

	clearInterval():void{

		if(this.interval){

			window.clearInterval(this.interval);

			this.interval = null;

		}

	}

	updateFile(file: LemtestFile):void{

		this.file = file;

		this.updateMongo();

	}

	updateMongo(remove = false):void{

		try{

			const {_id, datetime, file, progress, status, downloaded} = this;

			if(_id && remove){

				Meteor.call('exports.delete', _id, (errorResponse: Meteor.Error) => {

					if(errorResponse){

						console.log(errorResponse.error);

					}

				});

			}else if(_id){

				Meteor.call('exports.update', {_id, datetime, file, progress, status, downloaded}, (errorResponse: Meteor.Error) => {

					if(errorResponse){

						console.log(errorResponse.error);

					}

				});

			}

		}catch(error){

			console.log(error);

		}

	}

}
