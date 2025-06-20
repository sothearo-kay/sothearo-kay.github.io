<script lang="ts">
	import Marquee from './marquee.svelte';

	const technologies = [
		'HTML5',
		'CSS3',
		'JavaScript',
		'TypeScript',
		'React',
		'Vue.js',
		'Svelte',
		'Next.js',
		'Nuxt.js',
		'Angular',
		'Tailwind CSS',
		'SASS',
		'Python',
		'Node.js',
		'Docker',
		'Git',
		'GitHub',
		'Vim',
		'VS Code',
		'Vite',
		'Webpack',
		'ESLint',
		'Prettier',
		'Vitest',
		'Figma',
		'Prisma'
	];

	const getIcon = (tech: string) => {
		const iconMap: Record<string, string> = {
			React: 'reactjs',
			'Vue.js': 'vuejs',
			Svelte: 'sveltejs',
			'Next.js': 'nextjs',
			'Nuxt.js': 'nuxtjs',
			Vite: 'vitejs',
			'Node.js': 'nodejs',
			'Tailwind CSS': 'tailwindcss',
			GitHub: 'github-dark',
			'VS Code': 'vscode'
		};
		return iconMap[tech] || tech.toLowerCase();
	};

	const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
	const secondRow = technologies.slice(Math.ceil(technologies.length / 2));
</script>

{#snippet techIcon(tech: string)}
	<div class="inline-flex h-17 w-17" title={tech}>
		<img
			src={`https://raw.githubusercontent.com/xandemon/developer-icons/main/icons/${getIcon(tech)}.svg`}
			alt={tech}
			width="68"
			height="68"
			class="transition-transform duration-300 hover:scale-110"
		/>
	</div>
{/snippet}

<div class="relative w-full" role="region" aria-label="Technologies and programming languages">
	<Marquee pauseOnHover>
		{#each firstRow as tech (tech)}
			{@render techIcon(tech)}
		{/each}
	</Marquee>

	<Marquee pauseOnHover reverse>
		{#each secondRow as tech (tech)}
			{@render techIcon(tech)}
		{/each}
	</Marquee>

	<div
		class="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r"
	></div>
	<div
		class="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l"
	></div>
</div>
