<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme.svelte';
	import { Moon, Sun } from '@lucide/svelte';

	let githubIcon = $state('/github_dark.svg');

	$effect(() => {
		if (!browser) return;
		githubIcon = theme.current === 'dark' ? '/github_light.svg' : '/github_dark.svg';
	});

	const navMenu = [
		{ label: 'Home', path: '/' },
		{ label: 'Blog', path: '/blog' },
		{ label: 'Projects', path: '/projects' }
	];
</script>

<header class="sticky top-0 backdrop-blur-md" style="view-transition-name: header;">
	<div class="container grid grid-cols-[100px_1fr_100px] items-center">
		<div></div>

		<nav>
			<ul class="flex h-13 items-center justify-center">
				{#each navMenu as navItem (navItem.path)}
					<li
						aria-current={page.url.pathname === navItem.path ? 'page' : undefined}
						class="relative h-full"
					>
						<a href={navItem.path} class="flex h-full items-center px-4">{navItem.label}</a>
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
				<img src={githubIcon} alt="GitHub logo" class="h-4 w-4" />
			</button>

			<button
				aria-label="Toggle Theme"
				class="flex-center relative h-8 w-8 overflow-hidden rounded-full border"
				onclick={theme.toggle}
			>
				{#if theme.current === 'dark'}
					<div in:fly={{ y: 10 }}>
						<Sun class="h-4 w-4" />
					</div>
				{:else}
					<div in:fly={{ y: -10 }}>
						<Moon class="h-4 w-4" />
					</div>
				{/if}
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
