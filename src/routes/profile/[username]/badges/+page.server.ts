import { getUsersBadges } from '$lib/server/journal/badge';
import type { LayoutServerLoad } from '.svelte-kit/types/src/routes/profile/[username]/$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { username } = params;

	const badges = await getUsersBadges(username);

	return {
		badges
	};
};
