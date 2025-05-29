<script lang="ts">
	import { page } from '$app/state';
	import { formatDate } from '$lib/utils/date';
	import { url as baseUrl } from '$lib/constants/config';
	import { Calendar, Clock } from '@lucide/svelte';
	import BreadCrumb from '$lib/components/breadCrumb.svelte';
	import TableOfContents from '$lib/components/tableOfContents.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let wordCount = $derived(data.rawContent.split(/\s+/).length);
	let estimatedReadingTime = $derived(wordCount / 250);
	let segments = $derived(page.url.pathname.split('/').filter(Boolean));
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:image" content={`${baseUrl}/og/${data.meta.slug}`} />
	<meta property="og:type" content="article" />
</svelte:head>

<section class="grid grid-cols-[1fr_16rem] items-start gap-6">
	<div class="space-y-4 max-lg:col-span-2">
		<BreadCrumb {segments} currentTitle={data.meta.title} />

		<article>
			<hgroup>
				<h1 class="font-mono text-3xl">{data.meta.title}</h1>
				<p class="text-secondary my-2 flex gap-4 text-sm">
					<span class="inline-flex items-center gap-1">
						<Calendar class="h-4 w-4" />
						{formatDate(data.meta.date)}
					</span>
					<span class="inline-flex items-center gap-1">
						<Clock class="h-4 w-4" />
						{Math.ceil(estimatedReadingTime)} min read
					</span>
				</p>
			</hgroup>

			{#if data.meta.tags?.length}
				<div class="flex gap-x-3 text-sm transition-colors">
					{#each data.meta.tags as tag (tag)}
						<span
							class="bg-highlight text-text-highlight rounded px-1 py-0.5 font-mono font-medium"
						>
							&num;{tag}
						</span>
					{/each}
				</div>
			{/if}

			<div class="prose py-4">
				<data.content />
			</div>
		</article>
	</div>

	<div class="max-lg:hidden">
		<TableOfContents headings={data.meta.headings} />
	</div>
</section>
