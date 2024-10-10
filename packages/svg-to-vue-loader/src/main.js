import fs from 'node:fs';
import url from 'node:url';
import util from 'node:util';
import path from 'node:path';
import { optimize } from 'svgo';
import { load as cheerio } from 'cheerio';

const template = fs.readFileSync(
	path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'template.vue'),
	'utf-8',
);

export default function vueToSvgLoader(source) {
	const $ = cheerio(source, {
		xmlMode: true,
	});

	$('svg').removeAttr('width');
	$('svg').removeAttr('height');

	$('svg').attr(':width', 'size');
	$('svg').attr(':height', 'size');
	$('svg').attr('fill', 'currentColor');

	$('path').removeAttr('fill');

	const svg = optimize($.xml(), {
		path: this.resourcePath,
		multipass: true,
	});

	const vue = util.format(template, svg.data, path.basename(this.resourcePath, '.svg'));

	return vue;
}
