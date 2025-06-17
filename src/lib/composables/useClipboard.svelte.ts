export function useClipboard(delay = 1000) {
	const hasCopied = $state({ value: false });

	const onCopy = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			hasCopied.value = true;
		});
	};

	$effect(() => {
		if (!hasCopied.value) return;

		const timeoutId = setTimeout(() => {
			hasCopied.value = false;
		}, delay);

		return () => clearTimeout(timeoutId);
	});

	return {
		hasCopied,
		onCopy
	};
}
