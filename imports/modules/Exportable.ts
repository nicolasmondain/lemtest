import {

	LemtestFile,
	LemtestExportOptions,
	LemtestExportMethods

} from '../../@types/lemtest';

import c from './Exportable.constants';

export class Exportable{

	datetime  : number;
	file      : LemtestFile;
	progress  : LemtestExportOptions['progress'];
	status    : LemtestExportOptions['status'];
	downloaded: LemtestExportOptions['downloaded'];
	onChange  : LemtestExportOptions['onChange'];
	onDownload: LemtestExportOptions['onDownload'];
	interval  : any;

	constructor(datetime: number, options = c.DEFAULT_OPTIONS as LemtestExportOptions){

		this.datetime   = datetime;
		this.file       = options.file ?? c.DEFAULT_FILE;
		this.progress   = typeof options.progress === 'number' && options.progress >= c.DEFAULT_PROGRESS && options.progress <= c.PROGRESS_MAX ? options.progress : c.DEFAULT_PROGRESS;
		this.status     = c.STATUSES.includes(options.status) ? options.status : c.DEFAULT_STATUS;
		this.downloaded = options.downloaded === true;
		this.onChange   = typeof options.onChange === 'function' ? options.onChange : c.DEFAULT_ON_CHANGE;
		this.onDownload = typeof options.onDownload === 'function' ? options.onDownload : c.DEFAULT_ON_DOWNLOAD;
		this.interval   = null;

		this.localStorage();

	}

	static getExports(methods: LemtestExportMethods, existing = [] as Exportable[]):[Exportable]{

		const storage = window.localStorage.getItem('exports');
		const exports = storage ? JSON.parse(storage) : [];

		return exports.map((e: Exportable) => existing.find((f: Exportable) => f.datetime === e.datetime) || new Exportable(e.datetime, {

			file      : e.file,
			progress  : e.progress,
			status    : e.status,
			downloaded: e.downloaded,
			onChange  : methods.onChange,
			onDownload: methods.onDownload

		}));

	}

	start(): Promise<void>{

		return new Promise((resolve, reject) => {

			try{

				if(this.status === c.STATUS_PROGRESS){

					resolve();

					return;

				};

				this.status   = c.STATUS_PROGRESS;
				this.interval = window.setInterval(() => {

					this.progress += c.PROGRESS_AVERAGE;

					this.localStorage();
					this.onChange();

					if(this.progress >= c.PROGRESS_MAX){

						this.status = c.STATUS_FINISHED;

						this.clearInterval();
						this.localStorage();
						this.onChange();

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
		this.localStorage();
		this.onChange();

	}

	pause():void{

		if(this.status === c.STATUS_PAUSED) return;

		this.status = c.STATUS_PAUSED;

		this.clearInterval();
		this.localStorage();
		this.onChange();

	}

	cancel():void{

		if(this.status === c.STATUS_CANCELED) return;

		this.status = c.STATUS_CANCELED;

		this.clearInterval();
		this.localStorage();
		this.onChange();

	}

	delete():void{

		const DELETE = true;

		this.clearInterval();
		this.localStorage(DELETE);
		this.onChange();

	}

	download():void{

		try{

			const {file} = this;

			if(file._id){

				this.onDownload(file._id);

				file.downloaded += 1;

				const link    = document.createElement('a');
				const content = JSON.stringify(file);
				const blob    = new Blob([content], {type: 'text/plain'});

				link.href     = URL.createObjectURL(blob);
				link.download = file.name;

				link.click();

				this.downloaded = true;
				this.localStorage();

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

		return this.status === c.STATUS_FINISHED && !this.downloaded;

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

		this.localStorage();
		this.onChange();

	}

	localStorage(remove = false):void{

		try{

			const storage = window.localStorage.getItem('exports');
			const exports = storage ? JSON.parse(storage) : [];
			const store   = exports.find((e: Exportable) => this.datetime === e.datetime);

			const {datetime, file, progress, status, downloaded} = this;

			if(store && remove){

				exports.splice(exports.indexOf(store), 1);

			}else if(store){

				exports[exports.indexOf(store)] = {datetime, file, progress, status, downloaded};

			}else{

				exports.push({datetime, file, progress, status, downloaded});

			}

			window.localStorage.setItem('exports', JSON.stringify(exports));

		}catch(error){

			console.log(error);

		}

	}

}
