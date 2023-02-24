import { getUserIdBySessionId } from '$lib/server/auth/user';
import { toggleFollow } from '$lib/server/journal/follow';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ cookies, params }) => {
	const sessionId = cookies.get('sessionid') as string;
	const { username } = params;

	const followerUsername = await getUserIdBySessionId(sessionId);
	if (!followerUsername) throw error(203, 'Invalid user data');

	const follow = await toggleFollow({ followerUsername, followeeUsername: username });
	return json(follow);
};
