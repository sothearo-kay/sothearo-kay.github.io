<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronRight } from '@lucide/svelte';
	import type { HeadingData } from '$lib/types/post';

	interface Props {
		headings: HeadingData[];
	}
	let { headings }: Props = $props();

	let collapsed = $state(false);
	let visibleSlugs = $state<string[]>([]);

	onMount(() => {
		const visibilityMap = new Map<string, boolean>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const slug = entry.target.id;
					if (!slug) continue;

					visibilityMap.set(slug, entry.isIntersecting);
				}

				const visible = headings.map((h) => h.slug).filter((slug) => visibilityMap.get(slug));

				let deepestIndex = -1;
				for (const slug of visible) {
					const index = headings.findIndex((h) => h.slug === slug);
					if (index > deepestIndex) {
						deepestIndex = index;
					}
				}

				if (deepestIndex >= 0) {
					visibleSlugs = headings.slice(0, deepestIndex + 1).map((h) => h.slug);
				}
			},
			{
				rootMargin: '0px 0px -20% 0px',
				threshold: 0.1
			}
		);

		for (const { slug } of headings) {
			const el = document.getElementById(slug);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});

	function scrollToHeading(slug: string) {
		const el = document.getElementById(slug);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<nav aria-label="Table of Contents">
	<button class="flex w-full items-center justify-between" onclick={() => (collapsed = !collapsed)}>
		<p class="font-mono font-medium">Table of Contents</p>
		<ChevronRight
			class={['h-5 w-5 transition-transform duration-300', { 'rotate-90': !collapsed }]}
		/>
	</button>

	<div
		class={[
			'mt-1 grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
			collapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
		]}
	>
		<ul class="space-y-0.5 overflow-hidden">
			{#each headings as { text, slug, depth } (slug)}
				<li
					class={[
						'hover:text-foreground ml-[var(--size)] font-sans font-bold transition-colors duration-[250ms]',
						{ 'text-muted': !visibleSlugs.includes(slug) }
					]}
					style="--size: calc(1rem * {depth});"
				>
					<button
						class="underline-swipe"
						data-slug={slug}
						style="--underline-height: 2px;"
						onclick={() => scrollToHeading(slug)}
					>
						{text}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</nav>
