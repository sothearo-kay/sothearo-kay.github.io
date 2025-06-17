---
title: 'Deploying to GitHub Pages with pnpm'
description: 'Learn how to deploy a static site built with pnpm to GitHub Pages using GitHub Actions.'
tags: [deployment, github-actions, pnpm]
published: true
---

In this post, we'll explore how to deploy a static site built with pnpm to **GitHub Pages** using **GitHub Actions**.

## Steps to Set Up Deployment

1. Set up your `pnpm` project and build script.
2. Create a `.github/workflows/deploy.yml` file.
3. Configure GitHub Pages to deploy from `GitHub Actions`.
4. Push your changes to the `master` branch.

## GitHub Actions Workflow File

Here’s a sample `deploy.yml` file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v3
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install
      - run: pnpm build

      - uses: actions/upload-pages-artifact@v3
        with:
          name: github-pages name
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}

    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Common Issues and Fixes

| Issue                 | Possible Cause                             | Solution                                   |
| --------------------- | ------------------------------------------ | ------------------------------------------ |
| Duplicate deployments | Multiple workflows or manual re-runs       | Check your Actions tab and remove extras   |
| Deploy not triggered  | Wrong branch or misnamed workflow file     | Ensure `on.push.branches` is correctly set |
| 404 after deploy      | Wrong `build` path or missing `index.html` | Set correct `path: build` and check output |
