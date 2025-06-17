import { statSync } from 'fs';
import type { PostMetadata } from '$lib/types/post';

export function getPosts() {
	let posts: PostMetadata[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<PostMetadata, 'slug'>;

			// Use file creation date as fallback if no date provided
			let date = metadata.date;
			if (!date) {
				const filePath = path.replace('/src', 'src');
				const stats = statSync(filePath);
				date = stats.birthtime.toISOString();
			}

			const post = { ...metadata, slug, date } satisfies PostMetadata;
			if (post.published) posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}
