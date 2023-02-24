import { promises as fs } from 'fs';
import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const extensionDecoder = (type: string) => {
	const extensions = {
		'image/jpeg': 'jpg',
		'image/png': 'png'
	} as const;

	const isValidType = Object.keys(extensions).includes(type);

	if (!isValidType) return null;

	return extensions[type as keyof typeof extensions];
};

export const saveImage = async (blob: Blob) => {
	const filename = randomBytes(16).toString('hex');
	const buffer = Buffer.from(await blob.arrayBuffer());

	const extension = extensionDecoder(blob.type);

	if (!extension) throw Error('File type not accepted');

	const filepath = `${filename}.${extension}`;

	await fs.writeFile(`uploads/${filepath}`, buffer);

	return filepath;
};

export const materializeImage = async (blob: Blob, alt: string) => {
	const src = await saveImage(blob);
	return prisma.image.create({ data: { src, alt } });
};
