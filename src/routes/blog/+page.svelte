<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section>
	<h1>Blog</h1>
	<ul class="divide-y divide-dashed">
		{#each data.posts as post (post.slug)}
			<li class="py-6">
				<div class="mb-1">
					<small>{formatDate(post.date)}</small>
					<small></small>
				</div>
				<a class="underline-swipe text-2xl font-medium" href={`blog/${post.slug}`}>{post.title}</a>
				<p class="my-2">{post.description}</p>
				{#if post.tags?.length}
					<div class="flex gap-x-3 transition-colors">
						{#each post.tags as tag (tag)}
							<small class="bg-highlight text-text-highlight rounded px-1 py-0.5">{tag}</small>
						{/each}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	:root {
		--underline-height: 2px;
		--underline-color: currentColor;
	}

	.underline-swipe {
		position: relative;
		display: inline;
		background-image: linear-gradient(to right, var(--underline-color), var(--underline-color));
		background-repeat: no-repeat;
		background-position: left bottom;
		background-size: 0% var(--underline-height);
		transition: background-size 0.25s ease-in-out;
	}

	.underline-swipe:hover {
		background-size: 100% var(--underline-height);
	}
</style>
