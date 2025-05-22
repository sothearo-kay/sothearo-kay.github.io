<script lang="ts">
	import { onNavigate } from '$app/navigation';
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
	<ul>
		{#each navMenu as navItem (navItem.path)}
			<li>
				<a href={navItem.path}>{navItem.label}</a>
			</li>
		{/each}
	</ul>
</nav>

{@render children()}
