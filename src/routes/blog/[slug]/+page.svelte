<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let wordCount = $derived(data.rawContent.split(' ').length);
	let estimatedReadingTime = $derived(wordCount / 250);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<nav></nav>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p class="text-secondary mt-1 mb-2 flex gap-2">
			<span>Published at {formatDate(data.meta.date)}</span>
			<span>&middot;</span>
			<span>Reading time: {Math.round(estimatedReadingTime)} minutes</span>
		</p>
	</hgroup>

	{#if data.meta.tags?.length}
		<div class="flex gap-x-3 text-sm transition-colors">
			{#each data.meta.tags as tag (tag)}
				<span class="bg-highlight text-text-highlight rounded px-1 py-0.5 font-mono">
					&num;{tag}
				</span>
			{/each}
		</div>
	{/if}

	<div class="prose py-4">
		<data.content />
	</div>
</article>
