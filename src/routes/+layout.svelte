<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { initTheme } from '$lib/stores/theme.svelte';
	import Header from '$lib/components/header.svelte';
	import '../app.css';
	import '@fontsource/roboto';
	import '@fontsource/roboto/700.css';
	import '@fontsource/jetbrains-mono';
	import '@fontsource/jetbrains-mono/500.css';

	let { children } = $props();
	let currentThemeIndex = $state(0);
	let showTransition = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;
		currentThemeIndex = initTheme();

		requestAnimationFrame(() => {
			showTransition = true;
		});
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Header {currentThemeIndex} {showTransition} />
<main class="container py-10">
	{@render children()}
</main>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	:root::view-transition-old(root) {
		animation: 400ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
	}

	:root::view-transition-new(root) {
		animation: 400ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
	}
</style>
