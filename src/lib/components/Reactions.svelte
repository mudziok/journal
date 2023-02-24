<script lang="ts">
	const baseEmotes = ['👍', '❤️', '✨'] as const;

	export let reactions: { [emote: string]: number };
	export let highlightEmotes: Array<string>;
	export let onClick: (emoji: string) => void;
</script>

<div>
	{#each baseEmotes as emote}
		<button on:click={() => onClick(emote)} class:highlight={highlightEmotes.includes(emote)}>
			{emote}
			{#if reactions[emote]}
				{reactions[emote]}
			{/if}
		</button>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		gap: 8px;
	}

	button {
		background-color: var(--color-background);
		border: 1px var(--color-highlight) solid;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.8rem;
		padding: 4px 8px;
	}

	.highlight {
		border: 1px var(--color-text) solid;
		background-color: var(--color-highlight);
	}
</style>
