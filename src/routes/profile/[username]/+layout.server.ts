import { getUserByName, getUserIdBySessionId } from '$lib/server/auth/user';
import { getUsersBadges } from '$lib/server/journal/badge';
import { addEntryMetaInfo, getUsersEntries } from '$lib/server/journal/entry';
import { isFollowing } from '$lib/server/journal/follow';
import type { LayoutServerLoad } from '.svelte-kit/types/src/routes/profile/[username]/$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	const { username } = params;
	const sessionId = cookies.get('sessionid') as string;

	const user = await getUserByName(username);
	if (!user) {
		throw redirect(302, '/');
	}

	const viewerUsername = await getUserIdBySessionId(sessionId);
	if (!viewerUsername) return { entries: [] };

	const entries = await getUsersEntries(username);
	const entriesWithMetaInfo = entries.map((entry) => addEntryMetaInfo(entry, viewerUsername));

	const badges = await getUsersBadges(username);

	return {
		entries: entriesWithMetaInfo,
		user,
		badges,
		isFollowing: isFollowing({ followeeUsername: username, followerUsername: viewerUsername })
	};
};
