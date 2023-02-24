<script lang="ts">
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

Badges:
<div>
	{#each data.badges as badge}
		<span class="badge">
			<img src={`/uploads/${badge.imageSrc}`} alt={badge.name} />
			{format(badge.awardedAt, 'd-M-yyyy')}
		</span>
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 8px;
	}

	img {
		height: 60px;
		width: 60px;
	}

	.badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 400;
	}
</style>
