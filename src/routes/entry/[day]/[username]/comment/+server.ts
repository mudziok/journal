import { getUserIdBySessionId } from '$lib/server/auth/user';
import { createComment, deleteComment } from '$lib/server/journal/comment';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, cookies, params }) => {
	const sessionId = cookies.get('sessionid') as string;
	const { day, username } = params;
	const { content } = await request.json();

	const authorUsername = await getUserIdBySessionId(sessionId);
	if (!authorUsername) throw error(203, 'Invalid user data');

	const entryDay = new Date(day);
	const entryAuthorUsername = username;

	const comment = await createComment({ content, entryDay, entryAuthorUsername, authorUsername });
	return json(comment);
};

export const DELETE: RequestHandler = async ({ cookies, params }) => {
	const sessionId = cookies.get('sessionid') as string;
	const { day, username } = params;

	const authorUsername = await getUserIdBySessionId(sessionId);
	if (!authorUsername) throw error(203, 'Invalid user data');

	const entryDay = new Date(day);
	const entryAuthorUsername = username;

	const comment = await deleteComment({ entryDay, entryAuthorUsername, authorUsername });
	return json(comment);
};
