<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section>
	<h1>Blog</h1>
	<ul class="divide-y divide-dashed [&>li]:last:pb-0">
		{#each data.posts as post (post.slug)}
			<li class="py-6">
				<div class="mb-1">
					<small>{formatDate(post.date)}</small>
					<small></small>
				</div>
				<a
					href={`blog/${post.slug}`}
					class="underline-swipe text-2xl font-medium"
					style="--underline-height: 2px;"
				>
					{post.title}
				</a>
				<p class="my-2">{post.description}</p>
				{#if post.tags?.length}
					<div class="flex gap-x-3 text-sm transition-colors">
						{#each post.tags as tag (tag)}
							<span
								class="bg-highlight text-text-highlight rounded px-1 py-0.5 font-mono font-medium"
							>
								&num;{tag}
							</span>
						{/each}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>
