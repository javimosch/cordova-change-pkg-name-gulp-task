var gulp = require('gulp');
var argv = require('yargs').argv;
var sander = require('sander');
var path = require('path');
var convert = require('xml-js');

const CONFIGXML_PATH = process.env.CONFIGXML_PATH || path.join(process.cwd(), 'config.xml')
const CONFIGXML_TEMPLATE_PATH = process.env.CONFIGXML_TEMPLATE_PATH || path.join(process.cwd(), 'config-template.xml');

gulp.task('changePkgName', function() {

	let newPkgName = argv.pkg;

	console.log('Package will change to ', newPkgName);

	sander.readFile(CONFIGXML_TEMPLATE_PATH).then(buffer=>{
		let xml = buffer.toString('utf-8');
		let js = convert.xml2js(xml);


		console.log('Config has this pkg name',js.elements[0].attributes.id);

		js.elements[0].attributes.id = newPkgName;

		xml = convert.js2xml(js);

		console.log('Bingo!',xml.substring(0,100));

		sander.writeFileSync(CONFIGXML_PATH,xml);
		console.log('Config saved!');

	})

});

gulp.task('default', ['changePkgName']);