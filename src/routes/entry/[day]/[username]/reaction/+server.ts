import { getUserIdBySessionId } from '$lib/server/auth/user';
import { toggleReaction } from '$lib/server/journal/reaction';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, cookies, params }) => {
	const sessionId = cookies.get('sessionid') as string;
	const { day, username: entryAuthorUsername } = params;
	const { emote } = await request.json();

	const username = await getUserIdBySessionId(sessionId);
	if (!username) throw error(203, 'Invalid user data');

	const entryDay = new Date(day);

	const reaction = await toggleReaction({ username, entryAuthorUsername, entryDay, emote });
	return json(reaction);
};
