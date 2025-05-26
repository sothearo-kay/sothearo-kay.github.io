import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Suppress requests to /.well-known/appspecific/com.chrome.devtools.json
	// https://github.com/sveltejs/kit/issues/13743
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools.json')) {
		return new Response(null, { status: 204 }); // No Content
	}

	return await resolve(event);
};
