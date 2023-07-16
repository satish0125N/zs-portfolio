// const mix = require('laravel-mix');
// const path = require('path');
// var glob = require('glob');

// // const exportPath = path.resolve(__dirname, `blocks/**/`);
// const exportPath = path.resolve(__dirname, `scss/**/`);

// // create a glob of files
// // const entryArray = glob.sync('blocks/**/*.scss');
// const entryArray = glob.sync('scss/app.scss');

// /**
//  * Create a dictionary of entries in format: folder: ['file', 'file2']
//  * https://webpack.js.org/configuration/entry-context/#entry
//  */

// var folders = [];
// var entries = {};

// // list unique folders
// entryArray.map((item) => {
// 	const folderName = item.split('/')[2];
// 	if (!folders.includes(folderName)) {
// 		folders.push(folderName);
// 	}
// });

// // assign files to each folder
// folders.map((folder) => {
// 	var imports = [];
// 	entryArray.map((item) => {
// 		const folderName = item.split('/')[2];

// 		if (folder == folderName) {
// 			imports.push(item);
// 		}
// 	});

// 	entries[folder] = imports;

// 	imports.map((entry) => {
// 		let entryPath = entry.replace('.scss', '.css');
// 		mix.sass(`${entry}`, `${entryPath}`);
// 	});
// });

// mix
// 	.js('js/app.js', 'assets/js')
// 	.sass('sass/app.scss', 'style.css')
// 	// .sass('sass/blocks.scss', 'assets/css')
// 	.options({
// 		processCssUrls: false,
// 	});

// mix.webpackConfig((webpack) => {
// 	return {
// 		plugins: [
// 			new webpack.ProvidePlugin({
// 				$: 'jquery',
// 				jQuery: 'jquery',
// 				'window.jQuery': 'jquery',
// 			}),
// 		],
// 	};
// });

const mix = require('laravel-mix');
const path = require('path');
var glob = require('glob');

const exportPath = path.resolve(__dirname, `blocks/**/`);

// create a glob of files
const entryArray = glob.sync('blocks/**/*.scss');

/**
 * Create a dictionary of entries in format: folder: ['file', 'file2']
 * https://webpack.js.org/configuration/entry-context/#entry
 */

var folders = [];
var entries = {};

// list unique folders
entryArray.map((item) => {
	const folderName = item.split('/')[2];
	if (!folders.includes(folderName)) {
		folders.push(folderName);
	}
});

// assign files to each folder
folders.map((folder) => {
	var imports = [];
	entryArray.map((item) => {
		const folderName = item.split('/')[2];

		if (folder == folderName) {
			imports.push(item);
		}
	});

	entries[folder] = imports;

	imports.map((entry) => {
		// let entryPath = entry.replace('.scss', '.css');
		mix.sass(`${entry}`, `${entryPath}`);
	});
});

mix
	.js('js/app.js', 'assets/js')
	.sass('scss/app.scss', 'style.css')
	// .sass('sass/blocks.scss', 'assets/css')
	.options({
		processCssUrls: false,
	});

mix.webpackConfig((webpack) => {
	return {
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
			}),
		],
	};
});
