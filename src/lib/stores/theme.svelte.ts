import { Moon, Sun, Component } from '@lucide/svelte';

export type Theme = 'light' | 'dark';

export const theme = $state<{ value: Theme }>({ value: 'light' });

export const themeOptions: { value: Theme; Icon: typeof Component }[] = [
	{ value: 'light', Icon: Sun },
	{ value: 'dark', Icon: Moon }
];

export const applyTheme = (selectedTheme: Theme) => {
	if (selectedTheme === 'dark') {
		localStorage.setItem('theme', selectedTheme);
		document.documentElement.classList.add('dark');
	} else {
		localStorage.removeItem('theme');
		document.documentElement.classList.remove('dark');
	}

	theme.value = selectedTheme;
};

export const initTheme = (): number => {
	if (typeof window === 'undefined') return 0;

	const savedTheme = (localStorage.getItem('theme') as Theme) ?? 'light';
	applyTheme(savedTheme);

	return themeOptions.findIndex((t) => t.value === savedTheme);
};
