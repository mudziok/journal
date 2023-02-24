import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const awardMostReactions = async () => {
	const countedReactions = await prisma.reaction.groupBy({
		by: ['entryAuthorUsername'],
		_count: { _all: true },
		where: { entryDay: new Date() },
		orderBy: { _count: { entryAuthorUsername: 'desc' } }
	});

	const winners = countedReactions.slice(0, Math.ceil((countedReactions.length * 0.1) / 100));

	await Promise.all(
		winners.map(({ entryAuthorUsername }) =>
			prisma.badge.create({
				data: {
					name: 'Most Reactions',
					recipientUsername: entryAuthorUsername,
					imageSrc: 'most_reactions.png',
					awardedAt: new Date()
				}
			})
		)
	);
};

const awardMostComments = async () => {
	const countedComments = await prisma.comment.groupBy({
		by: ['entryAuthorUsername'],
		_count: { _all: true },
		where: { entryDay: new Date() },
		orderBy: { _count: { entryAuthorUsername: 'desc' } }
	});

	const winners = countedComments.slice(0, Math.ceil((countedComments.length * 0.1) / 100));

	await Promise.all(
		winners.map(({ entryAuthorUsername }) =>
			prisma.badge.create({
				data: {
					name: 'Most Comments',
					recipientUsername: entryAuthorUsername,
					imageSrc: 'most_comments.png',
					awardedAt: new Date()
				}
			})
		)
	);
};

const main = async () => {
	// await prisma.badge.deleteMany({ where: { name: 'Most Comments' } });
	// await prisma.badge.deleteMany({ where: { name: 'Most Reactions' } });
	// await prisma.image.create({ data: { alt: 'Most Comments', src: 'most_comments.png' } });
	// await prisma.image.create({ data: { alt: 'Most Reactions', src: 'most_reactions.png' } });
	await awardMostReactions();
	await awardMostComments();
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
