<script lang="ts">
	import type { LayoutData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import EntriesMasonry from '$lib/components/EntriesMasonry.svelte';

	export let data: LayoutData;

	const toggleFollow = async () => {
		const response = await fetch(`/profile/${data.user?.username}`, {
			method: 'PUT'
		});

		if (response.ok) {
			await invalidateAll();
		}
	};
</script>

<div class="wrapper">
	<div class="profile">
		<div class="header">
			<h1>
				@{data.user?.username}
				<button on:click={toggleFollow} class:highlight={data.isFollowing}>
					{data.isFollowing ? 'Unfollow' : 'Follow'}
				</button>
			</h1>
			<h3>
				<a href={`/profile/${data.user?.username}/follows`}>
					follows {data.user?.follows.length}
				</a>
				<hr />
				<a href={`/profile/${data.user?.username}/followed`}>
					followed by {data.user?.followedBy.length}
				</a>
				{#if data.badges?.length === 1}
					<hr />
					<a href={`/profile/${data.user?.username}/badges`}>
						has {data.badges?.length} badge
					</a>
				{/if}
				{#if data.badges?.length && data.badges?.length > 1}
					<hr />
					<a href={`/profile/${data.user?.username}/badges`}>
						has {data.badges?.length} badges
					</a>
				{/if}
			</h3>
		</div>
	</div>

	<slot />

	<EntriesMasonry entries={data.entries} />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.profile {
		display: flex;
		gap: 12px;
		overflow-x: auto;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 12px;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	@media (min-width: 768px) {
		.header {
			align-items: flex-start;
			width: auto;
		}
	}

	h1 {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	h3 {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	hr {
		height: 0;
		width: 12px;
		border: var(--color-highlight) 0.5px solid;
	}

	.highlight {
		border: 1px var(--color-text) solid;
		background-color: var(--color-highlight);
	}

	a {
		color: var(--color-text);
		text-decoration: none;
	}

	a:visited {
		color: var(--color-text);
	}
</style>
