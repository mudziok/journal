<script lang="ts">
	import Entry from '$lib/components/Entry.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.entry}
	<Entry entry={data.entry} maxComments={100} />
{/if}
