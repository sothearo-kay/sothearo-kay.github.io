# Sothearo's Personal Website

A modern personal website and blog built with SvelteKit, featuring TypeScript support, MDX content, and automated deployment to GitHub Pages.

🌍 **Live Site**: [https://sothearo-kay.github.io](https://sothearo-kay.github.io)

## Features

- **Modern Stack**: Built with SvelteKit 2.0 and TypeScript
- **MDX Blog**: Write blog posts in Markdown with frontmatter support
- **Dark/Light Theme**: Automatic theme switching with system preference detection
- **Static Site Generation**: Optimized for GitHub Pages deployment
- **Responsive Design**: Fully responsive layout with Tailwind CSS
- **SEO Optimized**: Meta tags, OpenGraph images, and RSS feed
- **Code Highlighting**: Syntax highlighting with Shiki
- **Type Safety**: Full TypeScript support throughout

## Content

The site includes:

- Personal homepage with avatar and introduction
- Blog section with technical posts about TypeScript, deployment, and more
- Projects showcase
- RSS feed for blog content

## Tech Stack

- **Framework**: SvelteKit with static adapter
- **Styling**: Tailwind CSS 4.0
- **Content**: MDSvex for Markdown processing
- **Code Highlighting**: Shiki with custom transformers
- **Icons**: Lucide Svelte
- **Fonts**: Inter and IBM Plex Sans
- **Package Manager**: pnpm
- **Deployment**: GitHub Actions → GitHub Pages

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Code Quality

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm check
```

## Deployment

This site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the `master` branch. The workflow:

1. Builds the static site with `pnpm build`
2. Uploads the build artifacts
3. Deploys to GitHub Pages

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── constants/      # Site configuration
│   ├── server/         # Server-side utilities
│   └── utils/          # Helper functions
├── posts/              # Blog posts in Markdown
├── routes/             # SvelteKit routes
│   ├── blog/           # Blog listing and post pages
│   ├── projects/       # Projects page
│   └── og/             # OpenGraph image generation
└── static/             # Static assets
```

## Adding Content

### Blog Posts

Create new blog posts in `src/posts/` with frontmatter:

```markdown
---
title: 'Your Post Title'
description: 'Brief description'
tags: ['tag1', 'tag2']
published: true
image: 'https://example.com/image.jpg'
---

Your content here...
```

### Projects

Add projects by editing `src/routes/projects/+page.svelte`.

## License

This project is for personal use. Feel free to use it as inspiration for your own site!
