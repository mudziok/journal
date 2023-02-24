import type { RequestHandler } from './$types';
import { promises as fs } from 'fs';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const image = await fs.readFile(`uploads/${id}`);
	return new Response(image);
};
