<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronRight } from '@lucide/svelte';
	import type { HeadingData } from '$lib/types/post';

	interface Props {
		headings: HeadingData[];
	}

	let { headings }: Props = $props();

	let collapsed = $state(false);
	let activeSlug = $state<string | null>(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible.length > 0) {
					activeSlug = visible[0].target.id;
				}
			},
			{
				rootMargin: '0px 0px -20% 0px',
				threshold: 0.5
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
			el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
		}
	}
</script>

<nav aria-label="Table of Contents" class="sticky top-17">
	<button class="flex w-full items-center justify-between" onclick={() => (collapsed = !collapsed)}>
		<p class="font-mono font-medium">Table of Contents</p>
		<ChevronRight
			class={['h-5 w-5 transition-transform duration-300', { 'rotate-90': !collapsed }]}
		/>
	</button>

	<div
		class={[
			'mt-1 grid transition-[grid-template-rows] duration-500',
			collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
		]}
	>
		<ul class="space-y-0.5 overflow-hidden">
			{#each headings as { text, slug, depth } (slug)}
				<li
					class={[
						'hover:text-foreground ml-[var(--size)] font-sans font-bold transition-colors',
						{ 'text-muted': slug !== activeSlug }
					]}
					style="--size: calc(1rem * {depth});"
				>
					<button
						class="underline-swipe"
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
