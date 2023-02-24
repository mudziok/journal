import { PrismaClient, type Badge, type User } from '@prisma/client';

const prisma = new PrismaClient();

type NewBadge = Badge;
type Username = User['username'];

export const awardBadge = async (newBadge: NewBadge) => {
	await prisma.badge.create({ data: { ...newBadge } });
};

export const getUsersBadges = async (username: Username) => {
	return await prisma.badge.findMany({
		where: { recipientUsername: username }
	});
};
