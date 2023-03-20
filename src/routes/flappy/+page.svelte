<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import { setup } from "./render";
	import { state } from "./store";

	let canvas: HTMLElement;
	let destroy: () => void;

	onMount(() => {
		destroy = setup({ node: canvas });
	});

	onDestroy(() => {
		destroy?.();
	});
</script>

<div class="flex-1">
	<div bind:this={canvas} />
	Generación {$state.generation} - Población {$state.population} - Record {$state.record}
</div>
