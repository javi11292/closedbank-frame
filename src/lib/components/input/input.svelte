<script lang="ts">
	import { classes } from "$lib/utils/classes";

	export let label: string | undefined = undefined;
	export let value: string | undefined = undefined;
</script>

<div
	class={classes(
		"group relative border-b border-solid border-neutral-400 py-1 transition-all duration-200 focus-within:border-lime-500"
	)}
>
	{#if label}
		<div
			class={classes(
				"pointer-events-none absolute top-5 origin-left text-neutral-400 transition-all duration-200 group-focus-within:-translate-y-full group-focus-within:text-xs group-focus-within:text-lime-500",
				value && "-translate-y-full text-xs"
			)}
		>
			{label}
		</div>
	{/if}

	<input
		bind:value
		class={classes("w-full [color-scheme:dark]", label && "pt-4")}
	/>
</div>
