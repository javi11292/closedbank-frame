<script lang="ts">
	import LoadingIcon from "$lib/components/loading-icon";
	import { classes } from "$lib/utils/classes";

	let className: string | undefined = undefined;
	export { className as class };
	export let loading = false;
	export let icon = false;
	export let disableUpperCase = false;
	export let variant: "contained" | "outlined" | "text" = "text";
	export let href: string | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
	export let withoutScale = false;
	export let withoutBorder = false;

	const variantClass = {
		contained: "bg-lime-500 text-black",
		outlined: "text-lime-500 border border-solid border-current",
		text: null,
	};
</script>

<svelte:element
	this={href ? "a" : "button"}
	on:click={onClick}
	on:keyup={undefined}
	class={classes(
		"relative cursor-pointer overflow-hidden",
		withoutScale ? "hover-opacity" : "hover-effect",
		loading && "pointer-events-none",
		icon ? "material-icons rounded-full p-2" : "py-2 px-4 font-bold",
		!withoutBorder && !icon && "rounded",
		!disableUpperCase && !icon && "text-sm uppercase",
		variantClass[variant],
		className
	)}
	{href}
>
	<span
		class={classes(
			"transition-opacity duration-500",
			loading ? "opacity-0" : "opacity-100"
		)}
	>
		<slot />
	</span>

	{#if loading}
		<LoadingIcon
			class="absolute inset-0 top-2/4 left-2/4 [translate:-50%_-50%]"
		/>
	{/if}
</svelte:element>
