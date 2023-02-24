import type { Actions, PageServerLoad } from './$types';
import { refreshSession } from '$lib/server/auth/session';
import {
	addEntryMetaInfo,
	createEntry,
	createEntryWithImage,
	getTrendingEntriesForToday,
	isEntrySentByUserToday
} from '$lib/server/journal/entry';
import { getUserIdBySessionId } from '$lib/server/auth/user';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('sessionid') as string;

	const username = await getUserIdBySessionId(sessionId);
	if (!username) return {};

	if (await isEntrySentByUserToday(username)) {
		const entries = await getTrendingEntriesForToday(username);
		const entriesWithMetaInfo = entries.map((entry) => addEntryMetaInfo(entry, username));
		return { entries: entriesWithMetaInfo };
	}
	return {};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const sessionId = cookies.get('sessionid') as string;
		const session = await refreshSession(sessionId);

		if (!session) return;
		const { username } = session;

		const data = await request.formData();

		const content = data.get('content') as string;

		const blob = data.get('photo') as Blob | null;
		if (blob && blob.size > 0) {
			await createEntryWithImage(content, username, blob);
		} else {
			await createEntry(content, username);
		}
	}
};
