<script lang="ts">
	import Button from "$lib/components/button";
	import Icon from "$lib/components/icon";
	import Input from "$lib/components/input";
	import Tooltip from "$lib/components/tooltip";
	import { classes } from "$lib/utils/classes";

	type Option = { label?: string; value?: string };

	let className: string | undefined = undefined;
	export { className as class };
	export let options: Option[] = [];
	export let label: string | undefined = undefined;
	export let selected: Option | undefined = undefined;

	let show = false;

	const onBlur = () => {
		show = false;
	};

	const onSelect = (option: Option) => () => {
		selected = option;
	};

	const onClick = () => {
		show = !show;
	};
</script>

<Tooltip {show}>
	<Input
		readonly
		class={classes("cursor-pointer", className)}
		value={selected?.label}
		{onBlur}
		{onClick}
		{label}
	>
		<Icon
			slot="icon"
			icon="dropdown"
			let:class={iconClassName}
			class={iconClassName}
		/>
	</Input>

	<svelte:fragment slot="tooltip">
		{#each options as option}
			<Button
				withoutScale
				withoutBorder
				disableUpperCase
				class={classes("w-full", option === selected && "bg-lime-700")}
				onClick={onSelect(option)}
			>
				{option.label}
			</Button>
		{/each}
	</svelte:fragment>
</Tooltip>
