<script lang="ts">
	import CreateEntry from '$lib/components/CreateEntry.svelte';
	import EntriesMasonry from '$lib/components/EntriesMasonry.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.entries}
	<EntriesMasonry entries={data.entries} />
{:else}
	<CreateEntry />
{/if}
