<script lang="ts">
	import { classes } from "$lib/utils/classes";

	let className: string | undefined = undefined;
	export { className as class };
	export let label: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let readonly = false;
	export let onFocus: (() => void) | undefined = undefined;
	export let onBlur: (() => void) | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
</script>

<div
	class={classes(
		"group grid border-b border-solid border-neutral-400 py-1 transition-all duration-200 focus-within:border-lime-500",
		className
	)}
>
	<div class="col-start-1 row-start-1 h-4" />
	<div
		class={classes(
			"pointer-events-none relative col-start-1 row-start-1 row-end-3 overflow-hidden",
			$$slots.icon && "mr-6"
		)}
	>
		{#if label}
			<div
				class={classes(
					"absolute top-4 origin-left text-neutral-400 transition-all duration-200 group-focus-within:-translate-y-full group-focus-within:text-xs group-focus-within:text-lime-500",
					value && "-translate-y-full text-xs"
				)}
			>
				{label}
			</div>
		{/if}
	</div>
	<input
		bind:value
		on:focus={onFocus}
		on:blur={onBlur}
		on:click={onClick}
		class={classes(
			"col-start-1 row-start-2 box-border w-full [color-scheme:dark]",
			$$slots.icon && "pr-6"
		)}
		{readonly}
	/>
	<slot
		name="icon"
		class="pointer-events-none col-start-1 row-start-2 justify-self-end"
	/>
</div>
