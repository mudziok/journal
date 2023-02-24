import type { Actions } from './$types';
import { deleteUser, getUserIdBySessionId } from '$lib/server/auth/user';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies }) => {
		const sessionId = cookies.get('sessionid') as string;

		const username = await getUserIdBySessionId(sessionId);
		if (!username) return;

		await deleteUser(username);

		throw redirect(302, '/');
	}
};
