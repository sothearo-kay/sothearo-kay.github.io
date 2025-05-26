<script lang="ts">
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { theme, themeOptions, applyTheme } from '$lib/stores/theme.svelte';

	interface Props {
		currentThemeIndex: number;
		showTransition: boolean;
	}

	const { currentThemeIndex, showTransition }: Props = $props();

	let currentIndex = $derived(currentThemeIndex);
	let ThemeIcon = $derived(themeOptions[currentIndex].Icon);

	const navMenu = [
		{ label: 'home', path: '/' },
		{ label: 'blog', path: '/blog' }
	];

	const toggleTheme = () => {
		currentIndex = (currentIndex + 1) % themeOptions.length;
		const next = themeOptions[currentIndex];
		applyTheme(next.value);
	};
</script>

<header class="bg-bg" style="view-transition-name: header;">
	<div class="container grid grid-cols-[100px_1fr_100px] items-center">
		<div></div>

		<nav>
			<ul class="flex h-13 items-center justify-center">
				{#each navMenu as navItem (navItem.path)}
					<li
						aria-current={page.url.pathname === navItem.path ? 'page' : undefined}
						class="relative h-full"
					>
						<a href={navItem.path} class="flex h-full items-center px-2">{navItem.label}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex items-center gap-3">
			<button
				aria-label="Link to GitHub"
				class="flex-center h-8 w-8 rounded-full border"
				onclick={() => window.open('https://github.com/sothearo-kay', '_self')}
			>
				<img
					src={theme.value === 'dark' ? '/github_light.svg' : '/github_dark.svg'}
					alt="GitHub logo"
					class="h-4 w-4"
				/>
			</button>

			<button
				aria-label="Toggle Theme"
				class="flex-center relative h-8 w-8 overflow-hidden rounded-full border"
				onclick={toggleTheme}
			>
				{#key currentIndex}
					<div
						in:fly={showTransition ? { y: -15, opacity: 0 } : undefined}
						out:fly={showTransition ? { y: 15, opacity: 0 } : undefined}
						class="absolute flex items-center justify-center"
					>
						<ThemeIcon class="h-4 w-4" />
					</div>
				{/key}
			</button>
		</div>
	</div>
</header>

<style>
	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-text-highlight);
		view-transition-name: active-page;
	}
</style>
