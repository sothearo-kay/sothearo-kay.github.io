export type HeadingData = {
	text: string;
	depth: number;
	slug: string;
};

export type PostMetadata = {
	title: string;
	slug: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
	headings: HeadingData[];
};
