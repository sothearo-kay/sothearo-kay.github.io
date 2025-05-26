import type { Handle } from '@sveltejs/kit';
import type { ColorScheme } from '$lib/context/theme.svelte';

export const handle: Handle = async ({ event, resolve }) => {
	// Suppress requests to /.well-known/appspecific/com.chrome.devtools.json
	// https://github.com/sveltejs/kit/issues/13743
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools.json')) {
		return new Response(null, { status: 204 }); // No Content
	}

	// Handle theme (for SSR)
	const colorScheme = (event.cookies.get('theme') ?? 'light') as ColorScheme;
	event.locals.colorScheme = colorScheme;

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('class=""', `class="${colorScheme}"`);
		}
	});
};
