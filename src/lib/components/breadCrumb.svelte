<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

	interface Props {
		segments: string[];
		currentTitle: string;
	}

	let { segments, currentTitle }: Props = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex items-center text-sm">
		{#each segments as segment, i (segment)}
			<li class="flex items-center">
				<a
					href={'/' + segments.slice(0, i + 1).join('/')}
					class="underline-swipe text-text-highlight capitalize"
					style="--underline-height: 1px;"
				>
					{i === segments.length - 1 ? currentTitle : segment}
				</a>
				{#if i < segments.length - 1}
					<ChevronRight class="mx-1 h-4 w-4" />
				{/if}
			</li>
		{/each}
	</ol>
</nav>
