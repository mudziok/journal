<script lang="ts">
	import CreateComment from '$lib/components/CreateComment.svelte';
	import UserHandle from '$lib/components/UserHandle.svelte';
	import type { Comment } from '@prisma/client';

	export let comments: Comment[];
	export let userComment: Comment | null = null;
	export let onSubmit: (content: string) => void;
	export let onDelete: () => void = () => {};
	export let andMore: boolean = false;
	export let link: string;
</script>

<ul>
	{#if !userComment}
		<CreateComment {onSubmit} />
	{:else}
		<li>
			<UserHandle username={userComment.authorUsername} date={userComment.createdAt} isLight>
				<button on:click={onDelete}>delete</button>
				<hr />
			</UserHandle>
			<p>
				{userComment.content}
			</p>
		</li>
	{/if}
	{#each comments as comment}
		<li>
			<UserHandle username={comment.authorUsername} date={comment.createdAt} isLight />
			<p>
				{comment.content}
			</p>
		</li>
	{/each}
	{#if andMore}
		<a href={link}>show more...</a>
	{/if}
</ul>

<style>
	ul {
		margin: 0;
		padding: 0;
		padding-block-start: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	li {
		display: flex;
		flex-direction: column;
	}

	p {
		margin: 0;
	}

	button {
		padding: 0;
		border: none;
		border-radius: 0;
		color: var(--color-highlight);
	}

	hr {
		height: 0;
		width: 12px;
		border: var(--color-highlight) 0.5px solid;
	}

	a {
		color: var(--color-text);
		text-decoration: none;
		font-weight: 500;
	}
</style>
