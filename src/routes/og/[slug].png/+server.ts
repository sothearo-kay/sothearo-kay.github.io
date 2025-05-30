import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { read } from '$app/server';
import { getPosts } from '$lib/server/posts.js';
import { createMetadataRow } from '$lib/utils/metadataRows';
import { site as siteName } from '$lib/constants/config';
import Inter from '$lib/fonts/Inter-Regular.ttf';
import IBMPlexSans from '$lib/fonts/IBMPlexSans-Bold.ttf';
import type { EntryGenerator, RequestHandler } from './$types';
import { formatDate } from '$lib/utils/date';

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

	const [inter, ibmPlexSans, rawContent] = await Promise.all([
		read(Inter).arrayBuffer(),
		read(IBMPlexSans).arrayBuffer(),
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
					padding: '48px',
					backgroundColor: '#f7f9fc'
				},
				children: [
					{
						type: 'div',
						props: {
							style: { display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' },
							children: [
								{
									type: 'img',
									props: {
										src: 'https://api.dicebear.com/9.x/thumbs/png?seed=Sothearo&backgroundColor=000000',
										width: 60,
										height: 60,
										style: { borderRadius: '9999px' }
									}
								},
								{
									type: 'p',
									props: { style: { fontSize: '32px', color: '#9ca0b0' }, children: siteName }
								}
							]
						}
					},
					{
						type: 'h1',
						props: {
							style: { fontFamily: 'IBMPlex Sans', fontSize: '64px', lineHeight: 1.2, margin: 0 },
							children: post.title
						}
					},
					{
						type: 'p',
						props: {
							style: { fontSize: '40px', color: '#4c4f69', marginTop: '32px' },
							children: post.description
						}
					},
					createMetadataRow({
						date: formatDate(post.date),
						readingTime: estimatedReadingTime.toString(),
						tags: post.tags
					})
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Inter',
					data: inter,
					weight: 400,
					style: 'normal'
				},
				{
					name: 'IBMPlex Sans',
					data: ibmPlexSans,
					weight: 700,
					style: 'normal'
				}
			]
		}
	);

	const ogImage = new Resvg(svg).render().asPng();

	return new Response(ogImage, {
		headers: {
			'Content-Type': 'image/png',
			'Content-Disposition': 'inline'
		}
	});
};
