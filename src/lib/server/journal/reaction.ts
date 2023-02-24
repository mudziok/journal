import { PrismaClient, type Reaction, type User } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

type NewReaction = Pick<Reaction, 'username' | 'emote' | 'entryAuthorUsername' | 'entryDay'>;
type Username = User['username'];
type Emote = string;

// const isReactionAlreadyAdded = async (reactionQuery: NewReaction): Promise<boolean> => {
// 	const foundReaction = await prisma.reaction.findFirst({ where: { ...reactionQuery } });
// 	return !!foundReaction;
// };

export const getUsersReactions = (reactions: Reaction[], username: Username): Reaction[] =>
	reactions.filter((reaction) => reaction.username == username);

export const extractEmotes = (reactions: Reaction[]): Array<Emote> =>
	reactions.map(({ emote }) => emote);

export const countReactions = (reactions: Reaction[]): { [emoji: Emote]: number } => {
	const emoteList = reactions.map(({ emote }) => emote);

	const countedEmotes = emoteList.reduce(function (acc, curr) {
		return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
	}, {} as { [emoji: Emote]: number });

	return countedEmotes;
};

// export const toggleReaction = async (reaction: NewReaction) => {
// 	const alreadyExists = await isReactionAlreadyAdded(reaction);
// 	if (!alreadyExists) {
// 		return prisma.reaction.create({ data: reaction });
// 	} else {
// 		return prisma.reaction.deleteMany({ where: reaction });
// 	}
// };

export const toggleReaction = async (reaction: NewReaction) => {
	const { emote, entryAuthorUsername, entryDay, username } = reaction;
	const formattedDate = format(entryDay, 'yyyy-MM-dd');

	return await prisma.$executeRawUnsafe(
		`CALL toggle_reaction('${emote}','${username}','${entryAuthorUsername}','${formattedDate}');`
	);
};
