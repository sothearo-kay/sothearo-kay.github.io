import { setContext, getContext } from 'svelte';

export type ColorScheme = 'light' | 'dark';

const THEME_CONTEXT_ID = Symbol('theme-context');

export class Theme {
	current = $state<ColorScheme>();

	constructor(init: ColorScheme) {
		this.current = init;
	}

	set = (colorScheme: ColorScheme) => {
		document.documentElement.className = colorScheme;
		document.cookie = `theme=${colorScheme}; Path=/; Max-Age=31536000; SameSite=Lax`;
		this.current = colorScheme;
	};

	toggle = () => {
		const newTheme = this.current === 'dark' ? 'light' : 'dark';
		this.set(newTheme);
	};
}

export function setThemeContext(colorScheme: ColorScheme) {
	setContext(THEME_CONTEXT_ID, new Theme(colorScheme));
}

export function getThemeContext(): Theme {
	return getContext<Theme>(THEME_CONTEXT_ID);
}
