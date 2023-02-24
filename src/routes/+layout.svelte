<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="full">
	<aside>
		<Header showAccount={'isLoggedIn' in data && data.isLoggedIn} />
	</aside>
	<main>
		<slot />
	</main>
</div>

<style>
	main,
	aside {
		padding: 12px;
	}

	main {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	@media (min-width: 768px) {
		main,
		aside {
			padding: 32px;
		}
	}

	.full {
		position: fixed;
		inset: 0;

		display: flex;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.full {
			display: grid;
			grid-template-columns: auto 1fr;
		}
	}

	:global(:root) {
		--color-primary: #d4cdc3;
		--color-primary-mid: #d5d0cd;
		--color-neutral: #f8f4e3;
		--color-secondary-mid: #a2a392;
		--color-secondary: #9a998c;

		--color-card: #f6f5f4;
		/* --color-highlight: #bab2ab; */
		--color-highlight: #a49f99;
		--color-background: #dbd4cc;
		--color-text: #010000;
		--color-action: rgb(212, 206, 185);
		--color-action-accent: #7f9183;

		--font-display: 'Gilda Display', sans-serif;
		--font-sans: 'Lato', 'Tomorrow', 'Inconsolata', 'Montserrat', sans-serif;
	}

	:global(body) {
		background-color: var(--color-background);
		color: var(--color-text);
	}

	:global(input) {
		border: var(--color-highlight) 1px solid;
		background-color: var(--color-background);
		padding: 8px 16px;
	}

	:global(textarea) {
		border: var(--color-highlight) 1px solid;
		background-color: var(--color-background);
		padding: 8px 16px;
	}

	:global(button) {
		background-color: var(--color-background);
		border: var(--color-text) 1px solid;
		border-radius: 100px;
		cursor: pointer;
		align-self: center;
		padding: 8px;
		font-size: 1rem;

		border: var(--color-highlight) 1px solid;
		background-color: var(--color-background);
		padding: 8px 16px;
	}

	:global(*) {
		font-weight: 300;
		font-family: var(--font-sans);
		margin: 0;
		padding: 0;
	}

	:global(*:focus) {
		outline: var(--color-highlight) 2px solid;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: var(--font-display);
	}
</style>
