<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import '../app.css';

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

	const navMenu = [
		{ label: 'home', path: '/' },
		{ label: 'about', path: '/about' },
		{ label: 'blog', path: '/blog' }
	];
</script>

<nav>
	<ul class="flex h-10 items-center justify-center">
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

<main class="container py-10">{@render children()}</main>

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
		border-top: var(--size) solid red;
		view-transition-name: active-page;
	}
</style>
