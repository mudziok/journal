<script lang="ts">
	import Cog6Tooth from '$lib/icons/Cog6Tooth.svelte';

	export let showAccount: boolean = false;
</script>

<nav>
	<a href="/"><h1>journal</h1></a>
</nav>

{#if showAccount}
	<div>
		<a href={`/account`}>
			<Cog6Tooth />
		</a>
	</div>
{/if}

<style>
	div {
		position: fixed;
		bottom: 12px;
		left: 12px;
		background-color: var(--color-background);
		z-index: 100;
		border-radius: 1000px;
	}

	nav {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 100;
	}

	a {
		text-decoration: none;
	}

	a:visited {
		color: unset;
	}

	h1 {
		color: var(--color-text);
		font-size: 3em;
		text-transform: uppercase;
		word-break: break-word;
	}
</style>
