<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		reverse?: boolean;
		pauseOnHover?: boolean;
		repeat?: number;
		children: Snippet;
	}

	let {
		class: className = '',
		reverse = false,
		pauseOnHover = false,
		children,
		repeat = 2
	}: MarqueeProps = $props();
</script>

<div class="group flex [gap:var(--gap)] overflow-hidden px-4 py-3 [--gap:2rem] {className}">
	{#each Array(repeat).fill(0), i (i)}
		<div
			class={[
				'animate-marquee flex shrink-0 justify-around [gap:var(--gap)]',
				{ 'group-hover:[animation-play-state:paused]': pauseOnHover },
				{ '[animation-direction:reverse]': reverse }
			]}
		>
			{@render children()}
		</div>
	{/each}
</div>
