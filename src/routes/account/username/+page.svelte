<script lang="ts">
	import { isUsernameValid } from '$lib/shared/auth/user';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let username = '';
	let status: Promise<{ taken: boolean; invalid: boolean; username: string }>;
	let timer: ReturnType<typeof setTimeout> | null = null;

	const checkUsernameStatus = async (username: string) => {
		if (!isUsernameValid(username)) return { username, invalid: true, taken: false };
		const response = await fetch(`/register/username/${username}`);
		return await response.json();
	};

	$: {
		if (timer) clearTimeout(timer);
		status = new Promise(() => {});
		timer = setTimeout(() => (status = checkUsernameStatus(username.toLowerCase())), 500);
	}
</script>

<main>
	<h1>USERNAME</h1>
	<form method="POST">
		<div class="pack">
			<label for="username">NEW USERNAME:</label>
			<input type="text" name="username" id="username" bind:value={username} />
			{#if status && username !== ''}
				{#await status}
					Loading...
				{:then status}
					{#if status.taken}
						This username is already taken
					{:else if status.invalid}
						This username in invalid
					{:else}
						<p>
							You'll be known as
							<span class:username>
								{`@${status.username}`}
							</span>
						</p>
					{/if}
				{/await}
			{/if}
		</div>

		{#if form?.missingUsername}The email field is required{/if}
		{#if form?.usernameTaken}This username is already taken{/if}

		{#await status}
			<button disabled>CHANGE USERNAME</button>
		{:then status}
			<button disabled={status.taken || status.invalid}> CHANGE USERNAME </button>
		{/await}
	</form>
</main>

<style>
	main {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
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

	p {
		font-weight: 300;
	}

	.username {
		font-weight: 500;
	}
</style>
