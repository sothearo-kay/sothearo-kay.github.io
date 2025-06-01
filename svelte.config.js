import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { join } from 'path';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import {
	transformerMetaHighlight,
	transformerMetaWordHighlight,
	transformerNotationDiff,
	transformerNotationHighlight,
	transformerNotationWordHighlight
} from '@shikijs/transformers';
import { remarkHeadings } from './plugins/remark-headings.js';
import rehypeSlug from 'rehype-slug';

const highlighter = await createHighlighter({
	themes: ['catppuccin-latte', 'catppuccin-mocha'], // light and dark
	langs: ['javascript', 'typescript', 'yaml']
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkHeadings],
	rehypePlugins: [rehypeSlug],
	highlight: {
		highlighter: async (code, lang = 'text', meta) => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					themes: {
						light: 'catppuccin-latte',
						dark: 'catppuccin-mocha'
					},
					...(meta && { meta: { __raw: meta } }),
					transformers: [
						...(meta
							? [transformerMetaHighlight(), transformerMetaWordHighlight()]
							: [
									transformerNotationDiff(),
									transformerNotationHighlight(),
									transformerNotationWordHighlight()
								])
					]
				})
			);

			return `<Components.pre code={\`${code}\`} lang="${lang}">{@html \`${html}\`}</Components.pre>`;
		}
	},
	layout: {
		_: join(import.meta.dirname, './src/mdsvex.svelte')
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// default options are shown. On some platforms
		// these options are set automatically
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: ''
		},
		alias: {
			$posts: 'src/posts',
			'$posts/*': 'src/posts/*'
		}
	}
};

export default config;
