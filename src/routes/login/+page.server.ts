import type { Actions } from './$types';
import { createSession } from '$lib/server/auth/session';
import { getUserByEmail, validatePassword } from '$lib/server/auth/user';
import { redirect, invalid } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email) return invalid(400, { missingEmail: true });
		if (!password) return invalid(400, { missingPassword: true });

		const user = await getUserByEmail(email);

		if (!user) return invalid(400, { incorrect: true });

		if (await validatePassword(user, password)) {
			const session = await createSession(user.username);
			cookies.set('sessionid', session.id);

			throw redirect(302, '/');
		}

		return invalid(400, { incorrect: true });
	}
};
