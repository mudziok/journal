<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Reactions from '$lib/components/Reactions.svelte';
	import Comments from '$lib/components/Comments.svelte';
	import type { Entry, User, Comment, Image } from '@prisma/client';
	import { format } from 'date-fns';
	import UserHandle from '$lib/components/UserHandle.svelte';
	import FaceSmile from '$lib/icons/FaceSmile.svelte';
	import CommentBubble from '$lib/icons/CommentBubble.svelte';

	export let entry: Entry & {
		author: User;
		comment: Comment[];
		userComment: Comment | null;
		image: Image | null;
		reaction: { [emote: string]: number };
		userReactions: Array<string>;
	};

	export let maxComments: number = 2;

	$: formattedDay = format(entry.day, 'yyyy-MM-dd');

	const toggleReaction = async (emote: string) => {
		const response = await fetch(`/entry/${formattedDay}/${entry.authorUsername}/reaction`, {
			method: 'PUT',
			body: JSON.stringify({ emote })
		});

		if (response.ok) {
			await invalidateAll();
		}
	};

	const addComment = async (content: string) => {
		const formattedDay = format(entry.day, 'yyyy-MM-dd');
		const response = await fetch(`/entry/${formattedDay}/${entry.authorUsername}/comment`, {
			method: 'PUT',
			body: JSON.stringify({ content })
		});

		if (response.ok) {
			await invalidateAll();
		}
	};

	const deleteComment = async () => {
		const formattedDay = format(entry.day, 'yyyy-MM-dd');
		const response = await fetch(`/entry/${formattedDay}/${entry.authorUsername}/comment`, {
			method: 'DELETE'
		});

		if (response.ok) {
			await invalidateAll();
		}
	};

	$: image = entry.image;
	$: comments = entry.userComment
		? entry.comment.slice(0, maxComments - 1)
		: entry.comment.slice(0, maxComments);
</script>

<article>
	<UserHandle username={entry.authorUsername} date={entry.createdAt}>
		<a href={`/entry/${formattedDay}/${entry.authorUsername}`}>link</a>
		<hr />
	</UserHandle>

	<p>
		{#if image}
			<img src={`/uploads/${image.src}`} alt={image.alt} />
		{/if}
		{entry.content}
	</p>

	<div class="interactions">
		<FaceSmile />
		<Reactions
			reactions={entry.reaction}
			onClick={(emote) => toggleReaction(emote)}
			highlightEmotes={entry.userReactions}
		/>
		<CommentBubble />
		<Comments
			{comments}
			userComment={entry.userComment}
			onSubmit={addComment}
			onDelete={deleteComment}
			andMore={entry.comment.length + +!!entry.userComment > maxComments}
			link={`/entry/${formattedDay}/${entry.authorUsername}`}
		/>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: 12px;
		text-align: justify;
	}

	img {
		width: 150px;
		aspect-ratio: 1;
		object-fit: cover;
		border: var(--color-highlight) 1px solid;
		float: right;
		border-radius: 4px;
		background-color: var(--color-highlight);
		margin-left: 1em;
		margin-bottom: 1em;
	}

	.interactions {
		width: 100%;
		display: grid;
		grid-template-columns: 16px 1fr;
		gap: 12px;
	}

	a {
		padding: 0;
		border: none;
		border-radius: 0;
		color: var(--color-text);
		text-decoration: none;
	}

	hr {
		height: 0;
		width: 12px;
		border: var(--color-text) 0.5px solid;
	}
</style>
