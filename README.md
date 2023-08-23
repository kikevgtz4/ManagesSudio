This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




--------------------------------------------------------------------------------------------------------
Go to your terminal and write “npx create-next-app@latest”
With tailwinds and ESlint
No src/directory

Create project in Supabase
Create the quickstart template of stripe subscription

Install packages:
npm install @supabase/supabase-js
npm i @supabase/auth-helpers-react
Npm i zustand
npm i react-icons
Npm i stripe
 npm i react-hot-toast


Create .env.local file with:
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

Install packages:
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js

Create a middleware.ts file
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard, req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard],
}

Install packages:
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
npm i tailwind-merge
 npm i clsx
npm i lucide-react
npx shadcn-ui@latest init
√ Would you like to use TypeScript (recommended)? ... no / yes
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Neutral
√ Where is your global CSS file? ... app/globals.css
√ Would you like to use CSS variables for colors? ... no / yes
√ Where is your tailwind.config.js located? ... tailwind.config.js
√ Configure the import alias for components: ... @/components
√ Configure the import alias for utils: ... @/lib/utils
√ Are you using React Server Components? ... no / yes
√ Write configuration to components.json. Proceed? ... yes
npx shadcn-ui@latest add button sheet card form input
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add table
npm install @tanstack/react-table



Create a folder in the app directory called “(landing)” and move the page.tsx into that folder

Create a folder in the app directory called “(dashboard)” with a layout.tsx file and a “(routes)” folder inside
Add folders for each page you want to add inside of the (routes) folder, i.e.:
Dashboard, Students, Teachers, Classes, Accounting, etc

Create a “lib”, “types”, “hooks”, “providers” and “components” folder in the root folder

Create an “account”, “login”, and “Sign-In” folder in the app directory with a page.tsx file in each

Lib:
Create a utils.ts file

Components: 
Create a navbar.tsx, sidebar.tsx, mobile-sidebar.tsx, and heading.tsx file inside
Hooks:
Create a useUser.tsx

Supabase Generating Types:
Install package: npm i supabase@">=1.8.1" --save-dev
Npx supabase login
Then put in your access token (it does not type)

npx supabase gen types typescript --project-id safmvwxwaehuhhgdoklc --schema public > types/supabase.ts

To update the types (I think, not proven yet):
"update-types": "npx supabase gen types typescript --project-id \"$PROJECT_REF\" > types/supabase.ts"

Types:
Create a Types.ts file
Providers:
Create a SupabaseProvider.tsx file
Go to the main layout file and wrap everything around SupabaseProvider (not html or body)
Create a UserProvider.tsx
Go to the main layout file and wrap UserProvider inside of SupabaseProvider
