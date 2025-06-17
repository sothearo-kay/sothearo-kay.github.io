<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		reverse?: boolean;
		pauseOnHover?: boolean;
		children: Snippet;
		repeat?: number;
		duration?: number;
		gap?: string;
	}

	let {
		class: className = '',
		reverse = false,
		pauseOnHover = false,
		children,
		repeat = 4,
		duration = 40,
		gap = '1rem',
		...props
	}: MarqueeProps = $props();
</script>

<div
	{...props}
	class="group flex overflow-hidden p-2 {className}"
	style="--duration: {duration}s; --gap: {gap}; gap: var(--gap);"
>
	{#each Array(repeat).fill(0), i (i)}
		<div
			class={[
				'animate-marquee flex',
				{ 'group-hover:[animation-play-state:paused]': pauseOnHover },
				{ '[animation-direction:reverse]': reverse }
			]}
			style="gap: var(--gap); animation-duration: var(--duration);]"
		>
			{@render children()}
		</div>
	{/each}
</div>
