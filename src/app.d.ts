// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ColorScheme } from '$lib/stores/theme.svelte';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			colorScheme: ColorScheme;
		}
	}
}

export {};
