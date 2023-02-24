<script lang="ts">
	import { formatRelative } from 'date-fns';

	export let username: string;
	export let date: Date;
	export let isLight: boolean = false;

	$: formattedDate = formatRelative(date, new Date());
</script>

<h5 class={isLight ? 'light' : ''}>
	<a href={`/profile/${username}`}>@{username}</a>
	<hr class={`line ${isLight ? 'line-light' : 'line-normal'}`} />
	<slot />
	{formattedDate}
</h5>

<style>
	h5 {
		font-family: var(--font-sans);
		font-weight: 300;
		font-size: 1rem;
		text-decoration: none;

		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--color-text);
	}

	.light {
		color: var(--color-highlight);
	}

	a {
		color: var(--color-text);
		text-decoration: none;
		font-weight: 500;
	}

	a:visited {
		color: var(--color-text);
	}

	.line {
		height: 0;
		flex: 1;
	}

	.line-light {
		border: var(--color-highlight) 0.5px solid;
	}

	.line-normal {
		border: var(--color-text) 0.5px solid;
	}
</style>
