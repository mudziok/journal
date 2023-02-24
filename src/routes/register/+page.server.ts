import type { Actions } from './$types';
import { createSession } from '$lib/server/auth/session';
import { isEmailAlreadyInUse, isUsernameTaken, registerUser } from '$lib/server/auth/user';
import { invalid, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = (data.get('username') as string).toLowerCase();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!username) return invalid(400, { missingUsername: true });
		if (!email) return invalid(400, { missingEmail: true });
		if (!password) return invalid(400, { missingPassword: true });

		if (await isUsernameTaken(username)) return invalid(400, { usernameTaken: true });
		if (await isEmailAlreadyInUse(email)) return invalid(400, { emailInUse: true });

		const user = await registerUser({ username, email, password });

		const session = await createSession(user.username);
		cookies.set('sessionid', session.id);

		throw redirect(302, '/');
	}
};
