<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Check, Copy } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		code: string;
		children: Snippet<[]>;
	}
	let { code, children }: Props = $props();

	let copied = $state(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(code).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 1500);
		});
	}
</script>

<div class="group relative">
	<button
		aria-label="Copy to clipboard"
		disabled={copied}
		class={[
			'flex-center absolute top-3 right-3 z-10 h-8 w-8 rounded border opacity-0 transition-[opacity,border-color]',
			' hover:enabled:border-text-highlight group-hover:opacity-100 disabled:cursor-not-allowed'
		]}
		onclick={copyToClipboard}
	>
		{#if copied}
			<div in:fade>
				<Check class="h-4 w-4" />
			</div>
		{:else}
			<div in:fade>
				<Copy class="h-4 w-4" />
			</div>
		{/if}
	</button>

	{@render children()}
</div>
