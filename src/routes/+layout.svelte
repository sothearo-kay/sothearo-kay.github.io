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

<header style="view-transition-name: header;">
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
</header>

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
