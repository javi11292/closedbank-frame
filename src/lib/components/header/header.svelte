<script lang="ts">
	import { classes } from "$lib/utils/classes";

	let className: string = "";
	export { className as class };
</script>

<header
	class={classes(
		className,
		"flex items-center justify-center bg-neutral-900 py-3 px-3"
	)}
>
	<slot />
</header>
