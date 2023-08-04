import {DDP} from 'meteor/ddp-client';
import {Meteor} from 'meteor/meteor';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import {FilesCollection} from '../imports/api/FilesCollection';

chai.use(chaiAsPromised);
chai.should();

const WAIT_FOR_SUBSCRIPTIONS_INTERVAL = 100;
const WAIT_FOR_SUBSCRIPTIONS_PROMISE  = () => new Promise(resolve => {

	const poll = Meteor.setInterval(() => {

    if (DDP._allSubscriptionsReady()){

      Meteor.clearInterval(poll);
      resolve();

    }

  }, WAIT_FOR_SUBSCRIPTIONS_INTERVAL);

});

if(Meteor.isClient){

	describe('lemtest (client)', function(){

		this.slow(20000);
		this.timeout(60000);

		beforeEach(() => WAIT_FOR_SUBSCRIPTIONS_PROMISE());

		describe('En utilisant Meteor.js avec Blaze comme framework front, réalise une liste d\'export qui répond aux règles suivantes :', () => {

			it('La page doit afficher un bouton "Export" qui permet de démarrer de façon asynchrone un nouvel export', function(){

				const button = document.querySelector('button.js-new');
				chai.assert.include(button.innerHTML, 'Export');

			});

			it('La page doit afficher la liste des exports', function(){

				const button = document.querySelector('button.js-new');

				button.click();

				const exports = document.querySelectorAll('li.js-export');

				chai.assert.isAbove(exports.length, 0);

			});

			it('La page doit afficher la liste des exports avec leur progression', function(){

				const exports             = document.querySelectorAll('li.js-export');
				const exportHTMLElement   = exports[exports.length - 1];
				const progressHTMLElement = exportHTMLElement.querySelector('progress');

				chai.assert.isNumber(progressHTMLElement.value);

			});

			it('L\'export avance de 5% chaque seconde', function(done){

				const exports             = document.querySelectorAll('li.js-export');
				const exportHTMLElement   = exports[exports.length - 1];
				const startHTMLElement    = exportHTMLElement.querySelector('button.js-start');
				const progressHTMLElement = exportHTMLElement.querySelector('progress');

				startHTMLElement.click();

				let count = 0;

				const PERCENT_BY_SECOND	= 5;
				const PERCENT_TOTAL     = 100;
				const SECOND            = 1000;

				const interval = Meteor.setInterval(() => {

					if(progressHTMLElement.value === PERCENT_TOTAL){

						Meteor.clearInterval(interval);

						chai.assert.isNumber(progressHTMLElement.value);
						chai.assert.equal(Math.round(progressHTMLElement.value), count * PERCENT_BY_SECOND);

						done();

					}else if(count * PERCENT_BY_SECOND > PERCENT_TOTAL){

						Meteor.clearInterval(interval);
						chai.assert.fail();

					}

					count += 1;

				}, SECOND);

			});

			it('Une fois l\'export terminé, la liste doit afficher l\'URL du résultat', function(){

				const exports           = document.querySelectorAll('li.js-export');
				const exportHTMLElement = exports[exports.length - 1];
				const urlHTMLElement    = exportHTMLElement.querySelector('span.js-url');

				chai.assert.isString(urlHTMLElement.innerHTML);
				chai.assert.isTrue(urlHTMLElement.innerHTML.includes('http'));

			});

			it('Un export est terminé lorsqu\'il atteint 100%', function(){

				const exports             = document.querySelectorAll('li.js-export');
				const exportHTMLElement   = exports[exports.length - 1];
				const progressHTMLElement = exportHTMLElement.querySelector('progress');

				chai.assert.isNumber(progressHTMLElement.value);
				chai.assert.equal(progressHTMLElement.value, 100);

			});

			it('Une fois arrivé à 100%, il sélectionne une url au hasard parmi les urls suivantes (cf. FilesCollection)', function(){

				const urls = FilesCollection.find({}).fetch().map((f) => f.url);

				const exports           = document.querySelectorAll('li.js-export');
				const exportHTMLElement = exports[exports.length - 1];
				const urlHTMLElement    = exportHTMLElement.querySelector('span.js-url');

				chai.assert.include(urls, urlHTMLElement.innerHTML);

			});

		});

 	});

}
