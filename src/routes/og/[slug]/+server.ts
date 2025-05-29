import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getPosts } from '$lib/server/posts.js';
import type { EntryGenerator, RequestHandler } from './$types';

export const entries: EntryGenerator = () => {
	const posts = getPosts();
	return posts.map((post) => ({ slug: post.slug }));
};

export const prerender = true;

export const GET: RequestHandler = async ({ params }) => {
	const post = getPosts().find((p) => p.slug === params.slug);

	if (!post) {
		return new Response('Not found', { status: 404 });
	}

	const svg = await satori(
		{
			type: 'div',
			props: {
				children: [
					{ type: 'h1', props: { children: post.title } },
					{ type: 'p', props: { children: post.description } },
					{ type: 'p', props: { children: `📅 ${post.date} | 🏷️ ${post.tags.join(', ')}` } }
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: []
		}
	);

	const png = new Resvg(svg).render().asPng();

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
};
