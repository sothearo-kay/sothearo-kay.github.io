import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { read } from '$app/server';
import { getPosts } from '$lib/server/posts.js';
import { createMetadataRow } from '$lib/utils/metadataRows';
import { url as baseUrl } from '$lib/constants/config';
import Roboto from '$lib/fonts/Roboto-Regular.ttf';
import JetBrains from '$lib/fonts/JetBrainsMono-Bold.ttf';
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

	const [roboto, jetbrains, rawContent] = await Promise.all([
		read(Roboto).arrayBuffer(),
		read(JetBrains).arrayBuffer(),
		import(`$posts/${params.slug}.md?raw`)
	]);

	const wordCount = rawContent.default.split(/\s+/).length;
	const estimatedReadingTime = Math.ceil(wordCount / 250);

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					padding: '16px',
					paddingBottom: '24px',
					backgroundColor: '#f7f9fc'
				},
				children: [
					{
						type: 'div',
						props: {
							style: { display: 'flex', alignItems: 'center', gap: '12px' },
							children: [
								{
									type: 'img',
									props: {
										src: 'https://api.dicebear.com/9.x/thumbs/png?seed=Sothearo&backgroundColor=000000',
										width: 24,
										height: 24,
										style: { borderRadius: '9999px' }
									}
								},
								{ type: 'p', props: { children: baseUrl } }
							]
						}
					},
					{
						type: 'h1',
						props: {
							style: { fontFamily: 'JetBrains Mono', fontSize: '26px', margin: 0 },
							children: post.title
						}
					},
					{ type: 'p', props: { children: post.description } },
					createMetadataRow({
						date: post.date,
						readingTime: estimatedReadingTime.toString(),
						tags: post.tags
					})
				]
			}
		},
		{
			width: 600,
			height: 315,
			fonts: [
				{
					name: 'Roboto',
					data: roboto,
					weight: 400,
					style: 'normal'
				},
				{
					name: 'JetBrains Mono',
					data: jetbrains,
					weight: 700,
					style: 'normal'
				}
			]
		}
	);

	const ogImage = new Resvg(svg).render().asPng();

	return new Response(ogImage, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
};
