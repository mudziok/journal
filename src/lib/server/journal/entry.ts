import { countReactions, extractEmotes, getUsersReactions } from '$lib/server/journal/reaction';
import { materializeImage } from '$lib/server/uploads/image';
import { PrismaClient, type Entry, type User } from '@prisma/client';

const prisma = new PrismaClient();

type Content = Entry['content'];
type AuthorUsername = Entry['authorUsername'];
type Username = User['username'];

export const createEntry = async (content: Content, authorUsername: AuthorUsername) => {
	return prisma.entry.create({ data: { content, authorUsername } });
};

export const createEntryWithImage = async (
	content: Content,
	authorUsername: AuthorUsername,
	blob: Blob
) => {
	const { src: imageSrc } = await materializeImage(blob, 'User generated');
	return prisma.entry.create({
		data: { content, authorUsername, imageSrc }
	});
};

export const getEntry = async (authorUsername: AuthorUsername, day: Date) => {
	return prisma.entry.findFirstOrThrow({
		where: { authorUsername, day },
		include: { author: true, comment: true, image: true, reaction: true }
	});
};

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;
type EntryIncluded = PromiseResolvedType<ReturnType<typeof getEntry>>;

export const getEntriesForToday = async () => {
	const entries = await prisma.entry.findMany({
		where: { day: new Date() },
		include: { author: true, reaction: true, comment: true, image: true }
	});

	return entries;
};

export const getTrendingEntriesForToday = async (username: Username) => {
	const trendingUsernames = (await prisma.$queryRaw`SELECT trending(${username});`) as Array<{
		trending: string;
	}>;

	const entries = await Promise.all(
		trendingUsernames.map(({ trending }) =>
			prisma.entry.findFirstOrThrow({
				where: { day: new Date(), authorUsername: trending },
				include: {
					author: true,
					reaction: true,
					comment: true,
					image: true
				}
			})
		)
	);

	return entries;
};

export const addEntryMetaInfo = (entry: EntryIncluded, username: Username) => {
	const entryWithMetaInfo = {
		...entry,
		comment: entry.comment.filter(({ authorUsername }) => authorUsername !== username),
		reaction: countReactions(entry.reaction),
		userReactions: extractEmotes(getUsersReactions(entry.reaction, username)),
		userComment: entry.comment.find(({ authorUsername }) => authorUsername === username) || null
	};

	return entryWithMetaInfo;
};

export const isEntrySentByUserToday = async (username: AuthorUsername) => {
	const todaysPost = await prisma.entry.findFirst({
		where: { authorUsername: username, day: new Date() }
	});
	return !!todaysPost;
};

export const getUsersEntries = async (
	authorUsername: AuthorUsername
): Promise<Array<EntryIncluded>> => {
	return prisma.entry.findMany({
		where: { authorUsername: authorUsername },
		include: { reaction: true, author: true, comment: true, image: true },
		orderBy: { day: 'desc' }
	});
};
