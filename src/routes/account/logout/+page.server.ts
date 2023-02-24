import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.delete('sessionid', {
			path: '/'
		});

		return { ok: true };
	}
};
