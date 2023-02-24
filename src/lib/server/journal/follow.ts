import { PrismaClient, type Follow, type User } from '@prisma/client';

const prisma = new PrismaClient();

type NewFollow = Pick<Follow, 'followerUsername' | 'followeeUsername'>;
type Username = User['username'];

export const isFollowing = async ({
	followeeUsername,
	followerUsername
}: NewFollow): Promise<boolean> => {
	const foundFollow = await prisma.follow.findFirst({
		where: { followerUsername, followeeUsername }
	});
	return !!foundFollow;
};

export const toggleFollow = async (follow: NewFollow) => {
	const alreadyExists = await isFollowing(follow);
	if (!alreadyExists) {
		return prisma.follow.create({ data: follow });
	} else {
		return prisma.follow.deleteMany({ where: follow });
	}
};

export const getFollows = async (username: Username) => {
	const follows = await prisma.follow.findMany({
		where: { followerUsername: username },
		select: { followeeUsername: true }
	});
	return follows.map(({ followeeUsername }) => followeeUsername);
};

export const getFollowers = async (username: Username) => {
	const followers = await prisma.follow.findMany({
		where: { followeeUsername: username },
		select: { followerUsername: true }
	});
	return followers.map(({ followerUsername }) => followerUsername);
};
