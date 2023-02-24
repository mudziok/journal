<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main>
	<h1>LOGIN</h1>
	<form method="POST">
		<div class="pack">
			<label for="email">EMAIL</label>
			<input type="email" name="email" id="email" />
		</div>
		<div class="pack">
			<label for="password">PASSWORD</label>
			<input type="password" name="password" id="email" />
		</div>

		{#if form?.incorrect}Couldn't find an account associated with these credentials{/if}
		{#if form?.missingEmail}The email field is required{/if}
		{#if form?.missingPassword}The password field is required{/if}

		<button>LOGIN</button>
		<a href="/register">REGISTER</a>
	</form>
</main>

<style>
	main {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		text-align: justify;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 8px;

		width: 200px;
	}

	.pack {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	a {
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
		text-decoration: none;
		color: var(--color-text);
	}
</style>
