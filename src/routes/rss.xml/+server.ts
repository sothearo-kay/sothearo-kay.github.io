import * as config from '$lib/constants/config';
import { getPosts } from '$lib/server/posts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const posts = getPosts();

	const items = posts
		.map(
			(post) => `
        <item>
          <title>${post.title}</title>
          <description><![CDATA[${post.description}]]></description>
          <link>${config.url}/blog/${post.slug}</link>
          <guid isPermaLink="true">${config.url}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
      `
		)
		.join('');

	const xml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>${config.title}</title>
        <description>${config.description}</description>
        <link>${config.url}/blog</link>
        <atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml" />
        <language>en</language>
        ${items}
      </channel>
    </rss>
  `.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
};

export const prerender = true;
