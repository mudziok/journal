<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	Followed by:
	{#each data.followers as follower}
		<a href={`/profile/${follower}`}>@{follower}</a>
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
