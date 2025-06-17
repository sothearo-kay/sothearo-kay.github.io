export function getResizedImageUrl(imageUrl: string, width = 1200, height = 630): string {
	if (!imageUrl || !imageUrl.startsWith('http')) return imageUrl;
	
	// Extract domain and path from URL
	const url = new URL(imageUrl);
	const imageParam = encodeURIComponent(url.hostname + url.pathname + url.search);
	
	return `https://images.weserv.nl/?url=${imageParam}&w=${width}&h=${height}&fit=cover`;
}