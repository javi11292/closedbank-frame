<script lang="ts">
	import { cubicInOut } from "svelte/easing";

	export let show = false;

	const appear = (node: HTMLDivElement) => ({
		duration: 300,
		easing: cubicInOut,
		css: (t: number) => `
      scale: ${t / 2 + 0.5};
      opacity: ${t};
    `,
	});
</script>

<span class="relative">
	<slot />

	{#if show}
		<div
			transition:appear
			class="absolute z-10 w-full rounded bg-zinc-900 pt-4 pb-4 shadow"
		>
			<slot name="tooltip" />
		</div>
	{/if}
</span>
