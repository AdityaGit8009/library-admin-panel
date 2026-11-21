# LibraryHub Admin Panel

LibraryHub is an interactive library administration demo built with Next.js, React, and TypeScript. A librarian can look up a title by ISBN, update a member's details, or record a book return. The catalog, member directory, and circulation desk share one set of records. Changes stay in the current browser tab's session across navigation and reloads. The demo starts with sample records and runs without an account or database.

## Explore the panel

| Screen | What you can try |
| --- | --- |
| Dashboard | Review current catalog and circulation counts, recent checkouts, and overdue titles. The monthly activity chart illustrates a sample period. |
| Books | Search by title, author, or ISBN, inspect record details, and compare available copies with total stock. New titles require a unique ISBN-10 or ISBN-13. |
| Members | Search by name or email, inspect a profile and its outstanding loans, or update contact details and membership status. Each member has a unique email address. |
| Loans | Issue an available title to an active member, set a due date, inspect the checkout record, and mark a copy as returned. |
| Reports | Explore sample monthly trends, membership types, and popular titles. Download the displayed report data as a CSV. |
| Settings | Preview library contact details, loan policies, and notification preferences. These fields use screen-local state. |

To follow a checkout through the system, note a title's available stock in Books, issue it from Loans, and look up the borrower in Members. Returning that loan restores the available copy and reduces the member's balance. Outstanding loans prevent deletion of the associated book or member.

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
| `npm test` | Run the Node regression suite for circulation, validation, storage, pagination, and exports. |
| `npm run build` | Create a production build in `.next/`. |
| `npm start` | Serve the production build locally after building it. |

## Source layout

- `app/page.tsx` switches between the six screens and manages the mobile menu.
- `components/admin/` contains the screens, record dialogs, and shared table pagination.
- `lib/library/` contains the sample records, session schema, and rules for borrowing and returns.
- `hooks/use-library.ts` shares records between screens and persists them in browser session storage.
- `components/ui/` contains reusable controls, including the dialogs, tables, and charts.
- `app/globals.css` defines the Tailwind theme and global styles.

## v0 workflow

This project was bootstrapped with v0. New chats in the linked project can push commits to this repository. The original project setup deploys merges to `main`. [Continue working on v0](https://v0.app/chat/projects/prj_3LGwTFN1Y82CqNu74yMoC0rn7KLy) · [Open in Kiro](https://v0.app/chat/api/kiro/clone/AdityaGit8009/library-admin-panel)

Framework and editor references are available in the [Next.js documentation](https://nextjs.org/docs), [Next.js tutorial](https://nextjs.org/learn), and [v0 documentation](https://v0.app/docs).
