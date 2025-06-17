<script lang="ts">
	import Marquee from './marquee.svelte';

	// Web Technologies (12)
	const webTechnologies = [
		{ name: 'HTML5', icon: 'html5' },
		{ name: 'CSS3', icon: 'css3' },
		{ name: 'JavaScript', icon: 'javascript' },
		{ name: 'TypeScript', icon: 'typescript' },
		{ name: 'React', icon: 'react' },
		{ name: 'Vue.js', icon: 'vuedotjs' },
		{ name: 'Angular', icon: 'angular' },
		{ name: 'Svelte', icon: 'svelte' },
		{ name: 'Next.js', icon: 'nextdotjs' },
		{ name: 'Nuxt.js', icon: 'nuxtdotjs' },
		{ name: 'Tailwind CSS', icon: 'tailwindcss' },
		{ name: 'SASS', icon: 'sass' }
	];

	// Tools & Frameworks (12)
	const toolsFrameworks = [
		{ name: 'Node.js', icon: 'nodedotjs' },
		{ name: 'Docker', icon: 'docker' },
		{ name: 'Git', icon: 'git' },
		{ name: 'GitHub', icon: 'github' },
		{ name: 'Vim', icon: 'vim' },
		{ name: 'VS Code', icon: 'visualstudiocode' },
		{ name: 'Vite', icon: 'vite' },
		{ name: 'Webpack', icon: 'webpack' },
		{ name: 'ESLint', icon: 'eslint' },
		{ name: 'Prettier', icon: 'prettier' },
		{ name: 'Vitest', icon: 'vitest' },
		{ name: 'Figma', icon: 'figma' }
	];

	const firstRow = webTechnologies;
	const secondRow = toolsFrameworks;
</script>

{#snippet techIcon(tech: { name: string; icon: string })}
	<div class="inline-flex h-15 w-15" title={tech.name}>
		<img
			src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg`}
			alt={tech.name}
			width="60"
			height="60"
			class="transition-transform duration-300 hover:scale-110"
		/>
	</div>
{/snippet}

<div class="relative w-full" role="region" aria-label="Technologies and programming languages">
	<Marquee pauseOnHover={true} duration={30} gap="1.5rem">
		{#each firstRow as tech (tech.name)}
			{@render techIcon(tech)}
		{/each}
	</Marquee>

	<Marquee pauseOnHover={true} duration={30} gap="1.5rem" reverse={true}>
		{#each secondRow as tech (tech.name)}
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
