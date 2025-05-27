import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const [post, rawContent] = await Promise.all([
			import(`$posts/${params.slug}.md`),
			import(`$posts/${params.slug}.md?raw`)
		]);

		return {
			content: post.default,
			meta: post.metadata,
			rawContent: rawContent.default
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
