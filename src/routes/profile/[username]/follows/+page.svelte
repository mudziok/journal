<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	Follows:
	{#each data.follows as follow}
		<a href={`/profile/${follow}`}>@{follow}</a>
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 8px;
	}

	a {
		color: var(--color-text);
		text-decoration: none;
		font-weight: 500;
	}

	a:visited {
		color: var(--color-text);
	}
</style>
