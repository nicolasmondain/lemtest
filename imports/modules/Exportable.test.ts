import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {Exportable} from './Exportable';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

import c from './Exportable.constants';

describe('lemtest (exportable)', function(){

	const exportable = new Exportable(new Date().getTime(), c.DEFAULT_OPTIONS);

	it('exportable should be an object', () => {

		chai.expect(exportable).to.be.an('object');

	});

	it('exportable should have standard methods: start, pause, stop, cancel, delete, download', () => {

		chai.expect(exportable.start).to.be.a('function');
		chai.expect(exportable.pause).to.be.a('function');
		chai.expect(exportable.stop).to.be.a('function');
		chai.expect(exportable.cancel).to.be.a('function');
		chai.expect(exportable.delete).to.be.a('function');
		chai.expect(exportable.download).to.be.a('function');

	});

});
