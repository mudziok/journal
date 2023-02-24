import type { User } from '@prisma/client';

type Username = User['username'];

export const isUsernameValid = (username: Username) => {
	if (username === '') return false;
	if (username.includes(' ')) return false;
	if (username.includes('\n')) return false;
	if (username.includes('@')) return false;

	return true;
};
