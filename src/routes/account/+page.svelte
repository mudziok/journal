<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main>
	<h1>MY ACCOUNT</h1>
	<a href={`/profile/${data.username}`}><button> MY PROFILE </button></a>
	<a href={`/account/username`}><button> CHANGE USERNAME </button></a>
	<a href={`/account/delete`}><button> DELETE ACCOUNT </button></a>
	<a href={`/account/logout`}><button> LOGOUT </button></a>
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
</style>
