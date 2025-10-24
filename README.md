# TPlus Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and configured to use [pnpm](https://pnpm.io/) as the package manager.

## Prerequisites

Make sure you have [pnpm](https://pnpm.io/) installed globally:

```bash
npm install -g pnpm
# or
npm install -g @pnpm/exe
```

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

- `pnpm dev` - Runs the development server
- `pnpm build` - Creates an optimized production build
- `pnpm start` - Starts the production server
- `pnpm lint` - Runs ESLint to check for code issues
- `pnpm type-check` - Runs TypeScript type checking

## Project Structure

This project uses a monorepo structure with pnpm workspaces. The workspace configuration is defined in `pnpm-workspace.yaml`.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Styling**: CSS with Material-UI components
- **Font Optimization**: [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Roboto](https://fonts.google.com/specimen/Roboto)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Material-UI Documentation](https://mui.com/material-ui/) - comprehensive guide to Material-UI components
- [pnpm Documentation](https://pnpm.io/motivation) - learn about pnpm features and benefits

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

When contributing to this project, please use pnpm for all package management operations to maintain consistency across the development team.
