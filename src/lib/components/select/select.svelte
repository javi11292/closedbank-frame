<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

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

	const onClick: MouseEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		show = !show;
		if (!show) {
			currentTarget?.blur();
		}
	};
</script>

<Tooltip {show}>
	<Input
		readonly
		disableFocusLabel
		class={className}
		inputClass="cursor-pointer"
		value={selected?.label}
		{onBlur}
		{onClick}
		{label}
	>
		<Icon slot="icon" icon="dropdown" let:class={iconClass} class={iconClass} />
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
