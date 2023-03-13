<script lang="ts">
	import { classes } from "$lib/utils/classes";

	let className: string | undefined = undefined;
	export { className as class };
	export let src: string;
</script>

<span class={classes("inline-block overflow-hidden rounded-full", className)}>
	<img class="h-[200px] w-[200px] object-contain" {src} alt="" />
</span>
