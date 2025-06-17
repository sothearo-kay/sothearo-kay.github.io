import { execSync } from 'child_process';
import type { PostMetadata } from '$lib/types/post';

export function getPosts() {
	let posts: PostMetadata[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<PostMetadata, 'slug'>;

			// Use git creation date as fallback if no date provided
			let date = metadata.date;
			if (!date) {
				const filePath = path.replace('/src', 'src');
				try {
					const gitDate = execSync(`git log --reverse --format=%ai -- "${filePath}"`, {
						encoding: 'utf8'
					})
						.trim()
						.split('\n')[0];
					date = new Date(gitDate).toISOString();
				} catch {
					// Fallback to current date if git command fails
					date = new Date().toISOString();
				}
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
