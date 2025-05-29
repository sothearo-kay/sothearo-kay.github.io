export function createMetadataRow(post: { date: string; readingTime: string; tags: string[] }) {
	const calendarIcon = {
		type: 'svg',
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			width: 28,
			height: 28,
			viewBox: '0 0 24 24',
			fill: 'none',
			stroke: 'currentColor',
			strokeWidth: 2,
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			children: [
				{ type: 'path', props: { d: 'M8 2v4' } },
				{ type: 'path', props: { d: 'M16 2v4' } },
				{ type: 'rect', props: { x: 3, y: 4, width: 18, height: 18, rx: 2 } },
				{ type: 'path', props: { d: 'M3 10h18' } }
			]
		}
	};

	const clockIcon = {
		type: 'svg',
		props: {
			xmlns: 'http://www.w3.org/2000/svg',
			width: 28,
			height: 28,
			viewBox: '0 0 24 24',
			fill: 'none',
			stroke: 'currentColor',
			strokeWidth: 2,
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			children: [
				{ type: 'circle', props: { cx: 12, cy: 12, r: 10 } },
				{ type: 'polyline', props: { points: '12 6 12 12 16 14' } }
			]
		}
	};

	return {
		type: 'div',
		props: {
			style: {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderTop: '1px solid rgba(136, 57, 239, 0.15)',
				paddingTop: '24px',
				marginTop: 'auto',
				color: '#9ca0b0'
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							alignItems: 'center',
							gap: '24px'
						},
						children: [
							{
								type: 'div',
								props: {
									style: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '28px' },
									children: [calendarIcon, { type: 'span', props: { children: post.date } }]
								}
							},
							{
								type: 'div',
								props: {
									style: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '28px' },
									children: [
										clockIcon,
										{ type: 'span', props: { children: `${post.readingTime} min read` } }
									]
								}
							}
						]
					}
				},
				{
					type: 'div',
					props: {
						style: { display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' },
						children: post.tags.map((tag) => ({
							type: 'div',
							props: {
								style: {
									fontSize: '28px',
									color: '#8839ef',
									backgroundColor: 'rgba(136, 57, 239, 0.15)',
									padding: '2px 12px',
									borderRadius: '4px'
								},
								children: `#${tag}`
							}
						}))
					}
				}
			]
		}
	};
}
