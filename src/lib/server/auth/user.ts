import { getSessionById } from '$lib/server/auth/session';
import { PrismaClient, type Session, type User } from '@prisma/client';
import { randomBytes, createHash } from 'crypto';

const prisma = new PrismaClient();

type SessionId = Session['id'];
type Username = User['username'];
type Email = User['email'];

interface Credentials {
	username: string;
	email: string;
	password: string;
}

const hash = (text: string, salt: string) =>
	createHash('md5')
		.update(text + salt)
		.digest('hex');

export const getUserByEmail = async (email: Email) => prisma.user.findFirst({ where: { email } });
export const getUserByName = async (username: Username) =>
	prisma.user.findFirst({ where: { username }, include: { follows: true, followedBy: true } });

export const getUserIdBySessionId = async (sessionId: SessionId) => {
	const session = await getSessionById(sessionId);
	if (!session) return null;

	const { username } = session;
	return username;
};

export const isUsernameTaken = async (username: Username) =>
	!!(await prisma.user.findUnique({ where: { username } }));

export const isEmailAlreadyInUse = async (email: Email) =>
	!!(await prisma.user.findUnique({ where: { email } }));

export const registerUser = async ({ username, email, password }: Credentials) => {
	const salt = randomBytes(16).toString('hex');
	const hashedPassword = hash(password, salt);

	const user = await prisma.user.create({
		data: { username, email, salt, password: hashedPassword }
	});
	return user;
};

export const validatePassword = async (user: User, password: string): Promise<boolean> => {
	const hashedPassword = hash(password, user.salt);
	return hashedPassword === user.password;
};

export const changeUsername = async (oldUsername: Username, newUsername: Username) => {
	return await prisma.user.update({
		where: { username: oldUsername },
		data: { username: newUsername }
	});
};

export const deleteUser = async (username: Username) => {
	return await prisma.user.delete({
		where: { username }
	});
};
