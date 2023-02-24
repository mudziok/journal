import { getUserIdBySessionId } from '$lib/server/auth/user';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('sessionid') as string;

	const username = await getUserIdBySessionId(sessionId);
	if (!username) return {};

	return {
		username
	};
};
