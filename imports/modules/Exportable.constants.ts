import {

	LemtestFile,
	LemtestExportOptions

} from '../../@types/lemtest';

const PROGRESS_INTERVAL   = 50;
const PROGRESS_DELAY      = 1000;
const PROGRESS_PER_DELAY  = 5;
const PROGRESS_AVERAGE    = PROGRESS_PER_DELAY / PROGRESS_DELAY * PROGRESS_INTERVAL;
const PROGRESS_MAX        = 100;
const STATUS_UNSTARTED    = 'UNSTARTED' as LemtestExportOptions['status'];
const STATUS_PROGRESS     = 'PROGRESS' as LemtestExportOptions['status'];
const STATUS_STOPPED      = 'STOPPED' as LemtestExportOptions['status'];
const STATUS_PAUSED       = 'PAUSED' as LemtestExportOptions['status'];
const STATUS_CANCELED     = 'CANCELED' as LemtestExportOptions['status'];
const STATUS_FINISHED     = 'FINISHED' as LemtestExportOptions['status'];
const STATUSES            = [STATUS_UNSTARTED, STATUS_PROGRESS, STATUS_STOPPED, STATUS_PAUSED, STATUS_CANCELED, STATUS_FINISHED];
const DEFAULT_FILE        = {_id: '', name: '', url: '', downloaded: 0} as LemtestFile;
const DEFAULT_PROGRESS    = 0;
const DEFAULT_DOWNLOADED  = false;
const DEFAULT_ID					= '';
const DEFAULT_DATETIME    = 0;
const DEFAULT_STATUS      = STATUS_UNSTARTED as LemtestExportOptions['status'];
const DEFAULT_OPTIONS     = {datetime: DEFAULT_DATETIME, file: DEFAULT_FILE, progress: DEFAULT_PROGRESS, status: DEFAULT_STATUS, downloaded: DEFAULT_DOWNLOADED} as LemtestExportOptions;
const DEFAULT_ON_CHANGE   = () => {};
const DEFAULT_ON_DOWNLOAD = () => 0;

export default {

	PROGRESS_INTERVAL,
	PROGRESS_DELAY,
	PROGRESS_PER_DELAY,
	PROGRESS_AVERAGE,
	PROGRESS_MAX,
	STATUS_UNSTARTED,
	STATUS_PROGRESS,
	STATUS_STOPPED,
	STATUS_PAUSED,
	STATUS_CANCELED,
	STATUS_FINISHED,
	STATUSES,
	DEFAULT_FILE,
	DEFAULT_PROGRESS,
	DEFAULT_DOWNLOADED,
	DEFAULT_ID,
	DEFAULT_DATETIME,
	DEFAULT_STATUS,
	DEFAULT_OPTIONS,
	DEFAULT_ON_CHANGE,
	DEFAULT_ON_DOWNLOAD

};
