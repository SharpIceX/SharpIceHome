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

/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
export default function vueToSvgLoader(content, map, meta) {
	const $ = cheerio(content, {
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
