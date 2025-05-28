<script lang="ts" module>
	import { code as pre } from '$lib/components/custom';

	/*eslint no-import-assign: "off"*/
	export { pre };
</script>

<script lang="ts">
	let { children } = $props();
</script>

{@render children()}
