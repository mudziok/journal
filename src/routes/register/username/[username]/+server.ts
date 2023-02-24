import { isUsernameTaken } from '$lib/server/auth/user';
import { isUsernameValid } from '$lib/shared/auth/user';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { username } = params;

	if (!username) throw error(403, 'No username specified');

	const taken = await isUsernameTaken(username);
	const invalid = !isUsernameValid(username);
	return json({
		username,
		taken,
		invalid
	});
};
