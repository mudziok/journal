import type { Actions } from './$types';
import { changeUsername, getUserIdBySessionId, isUsernameTaken } from '$lib/server/auth/user';
import { invalid, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const newUsername = (data.get('username') as string).toLowerCase();

		if (!newUsername) return invalid(400, { missingUsername: true });

		if (await isUsernameTaken(newUsername)) return invalid(400, { usernameTaken: true });

		const sessionId = cookies.get('sessionid') as string;

		const oldUsername = await getUserIdBySessionId(sessionId);
		if (!oldUsername) return;

		await changeUsername(oldUsername, newUsername);

		throw redirect(302, '/');
	}
};
