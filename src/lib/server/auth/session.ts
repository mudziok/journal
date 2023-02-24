import { PrismaClient } from '@prisma/client';
import { addSeconds, isAfter } from 'date-fns';

const prisma = new PrismaClient();

const SESSION_EXPIRE_SECONDS = 60 * 5;

export const createSession = async (username: string) => {
	await prisma.session.deleteMany({ where: { username } });

	const session = prisma.session.create({
		data: { expires: addSeconds(new Date(), SESSION_EXPIRE_SECONDS), username }
	});

	return session;
};

export const getSessionById = async (id: string) => {
	return prisma.session.findFirst({ where: { id } });
};

export const refreshSession = async (id: string) => {
	const session = await prisma.session.findUnique({ where: { id } });

	if (!session) return null;
	if (isAfter(new Date(), session.expires)) return null;

	return prisma.session.update({
		data: { expires: addSeconds(new Date(), SESSION_EXPIRE_SECONDS) },
		where: { id }
	});
};
