import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import type { PostMetadata } from '$lib/types/post';

type MarkdownModule = {
	default: Component;
	metadata: PostMetadata;
};

type RawMarkdownModule = {
	default: string;
};

export const load: PageLoad = async ({ params }) => {
	try {
		const [post, rawContent] = await Promise.all([
			import(`$posts/${params.slug}.md`) as Promise<MarkdownModule>,
			import(`$posts/${params.slug}.md?raw`) as Promise<RawMarkdownModule>
		]);

		return {
			content: post.default,
			meta: post.metadata,
			rawContent: rawContent.default
		};
	} catch {
		throw error(404, `Could not find ${params.slug}`);
	}
};
