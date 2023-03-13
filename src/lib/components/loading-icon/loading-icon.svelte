<script lang="ts">
	import { classes } from "$lib/utils/classes";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<svg class={classes("h-6 w-6 animate-spin", className)} viewBox="22 22 44 44">
	<circle
		class="circle"
		cx="44"
		cy="44"
		r="20.2"
		fill="none"
		stroke-width="3.6"
		shape-rendering="geometricPrecision"
	/>
</svg>

<style>
	@keyframes spin {
		0% {
			stroke-dasharray: 1px, 200px;
			stroke-dashoffset: 0;
		}

		50% {
			stroke-dasharray: 100px, 200px;
			stroke-dashoffset: -15px;
		}

		100% {
			stroke-dasharray: 100px, 200px;
			stroke-dashoffset: -125px;
		}
	}

	.circle {
		animation: spin 1.4s ease-in-out infinite;
		stroke-dasharray: 80px, 200px;
		stroke-dashoffset: 0;
		stroke: currentColor;
	}
</style>
