<script lang="ts">
	import { browser, dev } from "$app/environment";

	import "./layout.css";
	import font from "./material-icons.woff2";

	if (browser && !dev) {
		navigator.serviceWorker.register("/service-worker.js");
	}
</script>

<svelte:head>
	<link
		href={font}
		rel="preload"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<slot />
