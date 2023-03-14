<script lang="ts">
	import { classes } from "$lib/utils/classes";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<div
	class={classes(
		"rounded-lg bg-neutral-800 px-20 py-10 shadow-lg shadow-black",
		className
	)}
>
	<slot />
</div>
