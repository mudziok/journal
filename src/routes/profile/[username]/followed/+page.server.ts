import { getFollowers } from '$lib/server/journal/follow';
import type { LayoutServerLoad } from '.svelte-kit/types/src/routes/profile/[username]/$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { username } = params;

	const followers = await getFollowers(username);

	return {
		followers
	};
};
