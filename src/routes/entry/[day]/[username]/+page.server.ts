import { getUserIdBySessionId } from '$lib/server/auth/user';
import { addEntryMetaInfo, getEntry } from '$lib/server/journal/entry';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const sessionId = cookies.get('sessionid') as string;
	const { day, username: entryAuthorUsername } = params;

	const username = await getUserIdBySessionId(sessionId);
	if (!username) return {};

	const entry = await getEntry(entryAuthorUsername, new Date(day));
	const entryWithMetaInfo = addEntryMetaInfo(entry, username);
	return { entry: entryWithMetaInfo };
};
