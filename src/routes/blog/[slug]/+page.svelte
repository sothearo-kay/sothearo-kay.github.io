<script lang="ts">
	import { page } from '$app/state';
	import { formatDate } from '$lib/utils/date';
	import { ChevronRight, Calendar, Clock } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let wordCount = $derived(data.rawContent.split(' ').length);
	let estimatedReadingTime = $derived(wordCount / 250);
	let segments = $derived(page.url.pathname.split('/').filter(Boolean));
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<nav aria-label="Breadcrumb" class="mb-4">
	<ol class="flex items-center text-sm">
		{#each segments as segment, i (segment)}
			<li class="flex items-center">
				<a
					href={'/' + segments.slice(0, i + 1).join('/')}
					class="underline-swipe text-text-highlight capitalize"
					style="--underline-height: 1px;"
				>
					{i === segments.length - 1 ? data.meta.title : segment}
				</a>
				{#if i < segments.length - 1}
					<ChevronRight class="mx-1 h-4 w-4" />
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<article>
	<hgroup>
		<h1 class="font-mono text-3xl">{data.meta.title}</h1>
		<p class="text-secondary mt-1 mb-2 flex gap-4 text-sm">
			<span class="inline-flex items-center gap-1">
				<Calendar class="h-4 w-4" />
				{formatDate(data.meta.date)}
			</span>
			<span class="inline-flex items-center gap-1">
				<Clock class="h-4 w-4" />
				{Math.round(estimatedReadingTime)} min read
			</span>
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
