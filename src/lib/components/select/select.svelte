<script lang="ts">
	import Button from "$lib/components/button";
	import Input from "$lib/components/input";
	import Tooltip from "$lib/components/tooltip";
	import { classes } from "$lib/utils/classes";

	type Option = { label?: string; value?: string };

	let className: string | undefined = undefined;
	export { className as class };
	export let options: Option[];
	export let label: string | undefined = undefined;
	export let selected: Option | undefined = undefined;

	let show = false;

	const onFocus = () => {
		show = true;
	};

	const onBlur = () => {
		show = false;
	};

	const onSelect = (option: Option) => () => {
		selected = option;
	};
</script>

<Tooltip {show}>
	<Input
		readonly
		class={classes("cursor-pointer", className)}
		value={selected?.value}
		{onFocus}
		{onBlur}
		{label}
	/>
	<svelte:fragment slot="tooltip">
		{#each options as option}
			<Button
				withoutScale
				withoutBorder
				class={classes("w-full", option === selected && "bg-lime-700")}
				onClick={onSelect(option)}
			>
				{option.label}
			</Button>
		{/each}
	</svelte:fragment>
</Tooltip>
