<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
	import '@fontsource/roboto';
	import '@fontsource/roboto/700.css';
	import '@fontsource/jetbrains-mono';
	import '@fontsource/jetbrains-mono/500.css';

	let { children } = $props();

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

<div class="grid size-full grid-rows-[auto_1fr_auto]">
	<Header />

	<main class="container py-10">
		{@render children()}
	</main>

	<Footer />
</div>

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
