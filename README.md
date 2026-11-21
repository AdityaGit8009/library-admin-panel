# LibraryHub Admin Panel

LibraryHub is an interactive library administration demo built with Next.js, React, and TypeScript. A librarian can look up a title by ISBN, update a member's details, or record a book return. Each management screen starts with sample records and keeps edits in memory until you leave the screen or reload the page. Dashboard figures and report charts use their own sample data.

## Explore the panel

| Screen | What you can try |
| --- | --- |
| Dashboard | Review circulation totals, monthly loan activity, recent loans, and overdue titles. |
| Books | Search by title, author, or ISBN. Filter by category or status and add, edit, or delete catalog records. |
| Members | Search by name or email, filter by status, and add or update membership details. |
| Loans | Create a loan from the sample member and book lists, set a due date, filter by status, and mark a book as returned. |
| Reports | Explore monthly loans and returns, membership types, and the most borrowed books. |
| Settings | Try out library contact details, loan policies, and notification preferences. |

## Run locally

With Node.js 24 and npm installed, run these commands from the repository root.

```sh
npm ci
npm run dev
```

Open the dashboard at [localhost:3000](http://localhost:3000). The development server reloads changes as you edit.

## Check and build

| Command | Purpose |
| --- | --- |
| `npm run lint` | Run ESLint across the project. |
| `npm run typecheck` | Check TypeScript without producing a build. |
| `npm test` | Run regression tests for pagination and record IDs. |
| `npm run build` | Create a production build in `.next/`. |
| `npm start` | Serve the production build locally after building it. |

## Source layout

- `app/page.tsx` switches between the six screens and manages the mobile menu.
- `components/admin/` contains the screens, their sample records, and the shared table pagination.
- `components/ui/` contains reusable controls, including the dialogs, tables, and charts.
- `app/globals.css` defines the Tailwind theme and global styles.

## v0 workflow

This project was bootstrapped with v0. New chats in the linked project can push commits to this repository. The original project setup deploys merges to `main`. [Continue working on v0](https://v0.app/chat/projects/prj_3LGwTFN1Y82CqNu74yMoC0rn7KLy) · [Open in Kiro](https://v0.app/chat/api/kiro/clone/AdityaGit8009/library-admin-panel)

Framework and editor references are available in the [Next.js documentation](https://nextjs.org/docs), [Next.js tutorial](https://nextjs.org/learn), and [v0 documentation](https://v0.app/docs).
