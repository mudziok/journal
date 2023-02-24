import { refreshSession } from '$lib/server/auth/session';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (url.pathname == '/login') return;
	if (url.pathname == '/register') return;

	const sessionId = cookies.get('sessionid');
	if (!sessionId) throw redirect(302, '/login');

	const refreshedSession = await refreshSession(sessionId);
	if (!refreshedSession) throw redirect(302, '/login');

	return {
		isLoggedIn: !!refreshedSession
	};
};

export const ssr = true;
