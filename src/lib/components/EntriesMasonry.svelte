<script lang="ts">
	import type { Entry, User, Comment, Image } from '@prisma/client';
	import Item from '$lib/components/Entry.svelte';
	import Masonry from 'svelte-bricks';

	export let entries: Array<
		Entry & {
			author: User;
			comment: Comment[];
			userComment: Comment | null;
			image: Image | null;
			reaction: { [emote: string]: number };
			userReactions: Array<string>;
		}
	>;
	// 4, 8, 12, 20, 32, 52, 84, 136, 220, 356, 574
	let [minColWidth, maxColWidth, gap] = [356, 574, 32];
</script>

<Masonry
	items={entries}
	class=".item"
	{minColWidth}
	{maxColWidth}
	{gap}
	getId={(item) => `${item.authorUsername}-${item.day.toISOString()}`}
	let:item
>
	<Item entry={item} />
</Masonry>
