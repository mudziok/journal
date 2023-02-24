<main>
	<form method="POST" action="/" enctype="multipart/form-data">
		<label for="content">What are your thoughts for today?</label>
		<textarea name="content" id="content" />
		<input name="photo" id="photo" type="file" />
		<button>Submit</button>
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

		width: 250px;
	}

	textarea {
		resize: vertical;
	}
</style>
