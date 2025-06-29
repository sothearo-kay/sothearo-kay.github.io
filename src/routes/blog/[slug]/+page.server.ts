import { getPosts } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const posts = getPosts();
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, `Post ${params.slug} not found`);
	}

	return {
		date: post.date
	};
};
