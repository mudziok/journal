<script lang="ts">
	export let onSubmit: (content: string) => void;

	let content = '';
</script>

<span>
	<textarea name="content" bind:value={content} />
	<button on:click={() => onSubmit(content)}>Submit</button>
</span>

<style>
	span {
		display: flex;
		gap: 8px;
	}

	textarea {
		flex: 1;
	}
</style>
