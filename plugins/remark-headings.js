import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

/**
 * @typedef {Object} HeadingData
 * @property {string} text
 * @property {number} depth
 * @property {string} slug
 */

/**
 * @type {import('unified').Plugin<[], import('mdast').Root>}
 */
export const remarkHeadings = () => {
	return (tree, file) => {
		/** @type {HeadingData[]} */
		const headings = [];

		visit(tree, 'heading', (node) => {
			const text = toString(node);
			const depth = node.depth - 2; // start from h2
			const slug = text
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.trim()
				.replace(/\s+/g, '-');

			headings.push({ text, depth, slug });
		});

		file.data.fm = file.data.fm || {};
		file.data.fm.headings = headings;
	};
};
