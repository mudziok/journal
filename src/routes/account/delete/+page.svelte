<main>
	<h1>DELETE</h1>
	<form method="POST">
		<div class="pack">
			<label for="username">ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?</label>
			<button>DELETE</button>
		</div>
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
</style>
