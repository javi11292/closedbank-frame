<script lang="ts">
	import { browser, dev } from "$app/environment";

	import "$lib/assets/global.css";
	import { translations } from "$lib/utils/translate";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	if (browser && !dev) {
		navigator.serviceWorker.register("/service-worker.js");
	}

	if (data.translations) {
		translations.set(data.translations);
	}
</script>

<slot />
