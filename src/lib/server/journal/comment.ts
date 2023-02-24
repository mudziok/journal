import { PrismaClient, type Comment, type Entry, type User } from '@prisma/client';

const prisma = new PrismaClient();

type CommentId = Pick<Comment, 'authorUsername' | 'entryDay' | 'entryAuthorUsername'>;
type NewComment = CommentId & Pick<Comment, 'content'>;
type Username = User['username'];
type AuthorUsername = Entry['authorUsername'];
type Day = Entry['day'];

export const userCommentUnderEntry = async (
	username: Username,
	entryAuthorUsername: AuthorUsername,
	entryDay: Day
) => {
	const foundComment = await prisma.comment.findFirst({
		where: { authorUsername: username, entryAuthorUsername, entryDay }
	});
	return foundComment;
};

export const isUserCommentAmongComments = (comments: Comment[], username: Username) =>
	comments.some(({ authorUsername }) => authorUsername === username);

export const createComment = async (comment: NewComment) => {
	const { authorUsername, entryAuthorUsername, entryDay } = comment;

	const alreadyCommented = !!(await userCommentUnderEntry(
		authorUsername,
		entryAuthorUsername,
		entryDay
	));
	if (!alreadyCommented) {
		return await prisma.comment.create({ data: comment });
	}
	return null;
};

export const deleteComment = async (comment: CommentId) => {
	const { authorUsername, entryAuthorUsername, entryDay } = comment;

	return prisma.comment.deleteMany({ where: { authorUsername, entryAuthorUsername, entryDay } });
};
