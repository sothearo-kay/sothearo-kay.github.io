<script>
	import LanguageMarquee from '$lib/components/languageMarquee.svelte';
</script>

<div class="space-y-16">
	<section class="space-y-6 text-center">
		<div class="flex items-center justify-center gap-6">
			<div
				class="bg-highlight border-text-highlight h-20 w-20 overflow-hidden rounded-full border-2"
				style="view-transition-name: avatar;"
			>
				<img
					src="https://api.dicebear.com/9.x/thumbs/png?seed=Sothearo&backgroundColor=000000"
					alt="avatar"
					width="80"
					height="80"
				/>
			</div>
			<div class="text-left">
				<h1 class="text-foreground font-mono text-4xl font-bold">Sothearo</h1>
				<p class="text-secondary font-mono text-lg">Frontend Developer</p>
			</div>
		</div>

		<p class="text-foreground mx-auto max-w-2xl text-lg leading-relaxed">
			Passionate about creating innovative solutions with modern technologies. Specializing in web
			development and mobile apps.
		</p>
	</section>

	<section>
		<LanguageMarquee />
	</section>
</div>
