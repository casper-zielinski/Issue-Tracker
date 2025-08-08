# Next JS Course

## Part 1

### What is Next.js

**A Framework for building fast & search-engine friendly applications.** Its build on top of React, while React is a libary for building interactive UIs, Next.js is a comprehensive Framework.

#### What is a Framework

A collection of libaries, tools and conventions
Exp: Next.js includes it's own Router libary, so u don't have to use the react-router libary from react.

- **Easy Explained**

A framework is like scaffolding or toolbox that helps build software faster and more efficiently. It provides you with ready-made-components and rules, so you don't have to start everything from scratch

Example:
Instead of building a house brick by brick yourself, a framework gives you the walls, windows, and doors -- you just have to put them together

- **Morde detailed technical explanation (intermediate level)**

A framework is a collection of predefined tools, libaries, and architectural patterns that help developers build applications in a structured and consistent way.
Unlike a libary--which you call when you need it-- a framework calls your code at specific points. This concept is known as **Inversion of Control**

Example:
With a libary like React, you control when and how to use components.
Witj a framework like Next.js, the framework controls the app structure, handles routing, rendering, and even the server logic-- it just tells you where to plug in your logic.

Frameworks often handle: 

- Routing
- State managment
- Database access
- Authentication
- Server/client communication
- Build and deployment optimization

They help you focus on your app's logic instead of reinventing common solutions

```sh
npm i react-router
```

#### What it includes

- A **Compiler** for Transforming and minifying JS Code
- A **CLI** to Build and start apps
- **Node.js Runtime** to execute JS Code

#### What is a Node.js Runtime

There are **2** main ways to execute JS Code: Within the Client Side (**Web Browser**) and the Server Side (**Node.js Runtime**)

with this, we can do **Full-Stack-Development**

The Backendcode: **Node.js Runtime**
The Frontend Code: **Web Browser**

With only React:
Seperate File for Frontend and Backend (still with **Node.js** or **Java** or **Python** etc.)

This allows us to render our components on the server side, which is called **Server-Side-Rendering (SSR)**. This can make our Application faster and more SEO friendly (Search-engine Friendly).

#### Static Site Generation (SSG)

With **Next.js** we can prerender certain pages and components
that have static data, when we build our applicaiton, we just render them once and serve them whenever they are needed

This Technique is called **Static Site Generation** (SSG) and can make our Application super fast

#### Next.js in a Nutshell

A Framework for building fast & search-engine friendly applications

### Setting Up the Development Environment / Creating First Next.js Project

For Next.js, you should have **node version 16.8** or higher

To Create your first **Next.js** Project, you can use the following command:

```sh
npx create-next-app@latest    
```

Syntax: npx create-next-app@version

Then it will ask you to install some packages, press **y**
to proceed

Then it will ask you to choose a name for your name, type a name and with enter proceed

Then it asks if you like to use **TypeScript**, with keys choose **YES** or **NO**

Then it asks if you want to use ESLinst, with keys choose **YES** or **NO**

**ESLint** is a tool for automatic code analysis that helps you write clean and error-free JavaScript or TypeScript code.

ESLint is a so-called **linter** for JS and TS. It:

- Detects syntax errors  
- Checks code for style conventions (e.g. semicolons, spaces, etc.)  
- Can automatically fix many problems  
- And more...

A **linter** is a tool that analyzes your code to find errors, messy areas, or violations of style rules — before the program even runs.

Then it ask you if you want to use Tailwind CSS (CSS Framework with many Utility Classes)

Then it ask you if you would like to use a **src/** directory, a lot of Next.js projects actually don't use the **src/** folder

Then it ask you if you would like to use the **App Router**, which is recommended. In Next.js 13 there are 2 types of routers, the new App Router and the Legacy Pages Router

Then it ask if you want to use Turbopack, Turbopack is a new and modern JS-Bunder, the Successor of WebPack, but much faster, now (2025) beta, but developed activly

Then it ask if you want to customize the default import alias, which means you can configure paths in ``tsconfig.json`` or ``jsconfig.json``

some examples in the tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@assets/*": ["src/assets/*"],
      "@images/*": ["src/assets/images/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

Now it's gonna install all dependencies

Now with `npm run dev` you can run a development server

### Project Structure

the app folder (app-router)
the router is based on the app-router file-system

the **layout.tsx** represents the common layout for our pages
the **page.tsx** represents the current page, which is in the body of the **layout.tsx**

the **public** folder has public assests, like images

in the root there are also many config files for TS, next, tailwind etc.

### Routing and Navigation

The Routing System in Next.js is based on Convention, not Configuration. So the Names like **layout.tsx** and **page.tsx** are important and should be written correctly.

In the **page.tsx** you should export a react component, with the `rafce` shortcut you generate a React Component which is being exproted, it is short for *React Arrow Function Component Export*

what it generates:

```tsx
import React from 'react'

const page = () => {
      return (
        <div>page</div>
      )
      
}

export default page
```

Rename the Component to something meaningful like UserPage, the name for Routing purposes doesn't matter, but for reading purposes it does

!Important

for example you have a folder in the app folder named users and inside it a **page.tsx** and a **CSS file**, the page will be accessible under /users, but the **CSS File *NOT***

to use Links in the Pages, use the Link Component to determine where The **Link** leads, not **a** (Anchor)

Example:

```tsx
<Link href="/users">Users</Link>
```

### Client VS Server Components

2 Rendering Environments

1. Client (**Web Browser**)
2. Server (**Node.js Runtime**)

#### Client-side Rendering

- Large Bundles
- Resource intensive
- No SEO (cannot execute JS Code)
- less secure

#### Server-side Rendering

- Smaller bundles
- Resource efficient
- SEO
- more secure

#### Server Components <u>cannont</u>

- Listen to Browser Events
- Access browser APIs (exp: Local State)
- Maintain state
- use effects

In Real-World Applications we use bothe Server and Client Components

In the app folder, all pages are server side by default

to change that, type `'use client'` at the top of the file to make it a client component

To make the application faster and more SEO friendly, you want as little client components as possible, or as small as possible

For example extracting a single button as a client based component

### Data Fetching

#### Fetching on Client

`useState()` + `useEffect()`
React Query

**Over Time**:

- Large Bundles
- Resource intensive
- No SEO
- Less secure
- Extra roundtrip to server (backend)

#### Fetching on Server

Example:

```tsx
const UserPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", //Data that changes frequently
  });
  const data: User[] = await res.json();

  return (
    <>
      <h1 className="p-3">Users</h1>
      <table className="table table-bordered">
        <thead >
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className=" text-white p-2">
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserPage;
```

need to use a async function to use await, to await the fetch

`const res = await fetch("https://jsonplaceholder.typicode.com/users")`

to fetch data from backend, this returns a promise. To get the data from the promise use `await res.json()` and save it in a variable, this is also a promise, so you have to await it `const data: User[] = await res.json();`

Here a User interface is used to map through the users, if a type is not assigned, it doesn't work

User interface:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
```

You don't have to initialize a attribute for every value, but here i did.

### Caching

#### What is Caching

Storing data somewhere that is faster to access

There are 3 Main Data Sources

1. Memory
2. File System
3. Network

As we go down that list, it becomes increasingly longer to get the data. Fot this reason, Next.js comes with a build-in Cache.

```tsx
const res = await fetch('api', {
  cache: 'no-store'
});
```

useful, when data changes frequently, so it always shows fresh data, so disabling caching is the way to go.

The other option is, to keep data fresh for a certain period of time

```tsx
const res = await fethch('api', {
  next: { revalidate:  10 }
})
```

This makes Next.js run a backround job and get fresh data from the backend every 10 seconds

!important: caching behavior is only impemented in the fetch function so if you use a third party libary like axios, your not gonna get this

#### Caching rules what/when/how

| ✅ **Use Case**| 🛠️ **What to use** |💬 **Why** |
| --- | --- | --- |
| *Always fresh data* | `fetch(..., {cache: 'no-store'})` | Data changes frequently, so it always shows fresh data. Disables cache completely |
| *Static Content* | `fetch(...)` | Default is cache: 'force-cache' + revalidate: false = perfect for rarely changing content. Cached forever |
| *Data updates periodically* | `fetch(..., { next: { revalidate: 3600 } })` | Revalidates every 3600s (1 hour)

### Static and Dynamic Rendering (both on Server)

- **Static Rendering** Render at build time
- **Dynamic Rendering** Render at runtime

If you disable caching, you basically are saying that you don't need a saved (static) Version of a page/value, so you can't use static rendering. You have to use dynamic rendering.

**Dynamic Rendering** in Next.js means that the Page (or the data inside it) is created new with each request/reload - through **Server Side Rendering (SSR)** or a `fetch()` with `cache: 'no-store'`

with `cache: 'no-store'` you are telling Next.js to not use the cache, so it will always fetch the data from the backend, which means it will always be dynamic.

### Styling

#### Global CSS

use a global.css / globals.css and import it in the layout.tsx to use it in the whole site. For global styles, use the `:root` pseudo-class to target the root element of the document.

#### CSS Module

A CSS File that is scoped to a component / page

for a singular component, you can use the `module.css` file, which is a CSS file that is scoped to that component. This is useful for components that have a lot of CSS, but don't want to pollute the global CSS namespace. Also to prevent CSS conflicts between components. You can import it in the component like this: `import styles from './styles.module.css'`;

You than for example can use it like this: `<button className={styles.button}>...</button>`

you use styles.{classname},
so the CSS in this example would look like this:

```css
.button {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin: 1rem;
      transition: 0.4s ease-in-out;
}

.button:hover{
      transform: scale(1.1);
      transition: 0.4s ease-in-out;
      background-color: blue;
      box-shadow: 0 0 20px rgba(67, 1, 1, 0.5);
}
```

!important, the class names in the css files cannot include hypthons, like: *card-container*, *button-container* and so on. It is also recommended to name the css file after the component and even make a folder named after the component where the component itself and the css module is located

### Tailwind CSS

using it, you have to import tailwind.css in the global.css

like

```css
@import "tailwindcss";
```

### Daisy UI

Like Bootstrap for Tailwind CSS, has components

to install:

```sh
npm i -D daisyui@latest
```

then in global.css:

```css
@plugin "daisyui" 
```

## Part 2

### Navbar

A good example for a Navbar: (using DaisyUI)

```tsx
<div className="navbar bg-sky-700 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/">Issues</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl rounded-2xl">Issue Tracker</a>
        <div className="hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link href="/">Issues</Link>
                </li>
                <li>
                  <Link href="/">Issues</Link>
                </li>
              </ul>
        </div>
      </div>
    </div>
```

### installing React Icons

```sh
npm install react-icons --save
```

Then go on the Website
[React Icons](https://react-icons.github.io/react-icons/)

here is the navbar where it is used, you have to import it and then use it in your component

```tsx
import Link from "next/link";
import React from "react";
import { VscEditSession } from "react-icons/vsc";

const Nav = () => {
  return (
    <div className="navbar bg-sky-700 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/">Issues</Link>
            </li>
          </ul>
        </div>
        <VscEditSession className="m-3"/>
        <a className="btn btn-ghost text-xl rounded-2xl">Issue Tracker</a>
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/">Issues</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;

```

!important If you want to use the navbar in each page, use it in the layout.tsx, idealy before the children, so it will be on top, also, because all components are in the folder of the corresponding page, you don't have to create a components folder

### classnames libary

For better readable classnames, (i personally don't like it so i didn't used it),

Installing it:

```sh
npm i classnames@latest
```

Importing it:

```tsx
import classnames from 'classnames';
```

Using it: (Example)

```tsx
<h1 className={
  classnames({
    'm-3': true //will be always rendered
    'text-zinc-400': link.href === currentPath // depending on the condition
    'text-zinc-900': link.href !== currentPath // depending on the condition
  })
}> </h1>
```

so you have:

`classname({
  key(css-class):condition(boolean-value)
})
`

### Prisma

Prisma is a Database Toolkit for TS/JS that makes working with Database much easier.

You define your Database in a `.prisma` file

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

Installing it:

```sh
npm i prisma@{version}
```

Initializing it in a NEXT Project

```sh
npx prisma init
```

#### Configuring Data Base (local)

Changing the `DATABASE_UR` Variable in the `.env` file

for example:

```env
# Local PostgreSQL connection
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Example:
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/issue"
```

*postgres* is standard username, as well as the Port 5432

Data Base Schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Issue {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  status      Status   @default(OPEN)
  priority    Priority @default(MEDIUM)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  assigneeId  Int?
  assignee    User?    @relation(fields: [assigneeId], references: [id])
}

model User {
  id     Int     @id @default(autoincrement())
  email  String  @unique
  name   String
  issues Issue[]
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

Some of the keywords explained:

- `@id`d id value
- `@default(autoincrement())` auto-incrementing id
- `@relation(fields: [assigneId], references: [id])` foreign key referencing the `id` field in the `User` model, which is used to establish the relationship between `Issue` and `User`, whole `assignee User? @relation(fields: [assigneeId], references: [id])`
- `DateTime @default(now())` default value for the `createdAt` field is the current date and time
- `DateTime @updatedAt` automatically updates the `updatedAt` field whenever the record is updated

generator client an database db come in with the build
If your schema.prisma doesn't look that good, use the `npx prisma format` in the terminal to format it.
Then  the next step is to create a Migration. You can do this by running the following command in your terminal:

```sh
npx prisma migrate dev
```

It then ask you for a migration name, use something like: 

`initial migration` or `create-(model-name)-model`

This creates a new migration file in the `migrations` directory. The migration file contains the SQL code to create the tables in your database. You should check then if the databese is created (Used pgAdmin 4 for this example) and the schema is correct.

### Building API

Create a new folder in the APP Folder called api, there i created a issues folder for the issues API, for other API's, another folder

Then add a route file (route.ts)
inside this file export a POST function which takes a request parameter of the type NextRequest. You then await the request Promise (convert from JSON Response to JS Object) in a Variable, a body constant. But we have to validate the data, we can use **zod** for this.

**Zod** is a TypeScript-first Schema Validationlibary

with this you can

1. Create Schema defenition with `z.Object`

also, you only need to post values that are needed to be posted, so you don't need to post a id value which is default, or any default value at all (not always!)

```ts
import { z } from "zod";

const createNameSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

```

2. Validation

```ts
 const validation = createIssueSchema.safeParse(body);
```

safeparse doesn't throw a error, but returns either a succes or a error

Example of checking it

```ts
if (!validation.success)
    return NextResponse.json(validation.error.message, { status: 400 });
```

This is a *Errror Message*

#### Next.js API Notes- Route, Client, Postman & File Structure

1. File Structure (APP Router)

- API Routes must be named `route.ts/js` - **nothing else!**

- Folder name = URL Path

```text
src/app/api/issues/route.ts    → /api/issues
src/app/api/users/route.ts     → /api/users
src/app/api/auth/login/route.ts → /api/auth/login
```

```text
src/
├── app/
│   ├── api/
│   │   ├── issues/
│   │   │   └── route.ts      ← POST /api/issues
│   │   ├── users/
│   │   │   └── route.ts      ← GET/POST /api/users
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts  ← POST /api/auth/login
│   ├── page.tsx              ← Homepage
│   └── layout.tsx
├── components/
├── lib/                      ← Utility functions
└── prisma/
    ├── client.ts            ← Database client
    └── schema.prisma        ← Database schema
```

🚨 Common Mistakes:

- **api/issues.ts** instead of **api/issues/route.ts**

- Folder name != URL (e.g., issue bs issues)

2. route.ts - API Endpoints

Basic Structure: 

```ts
import { NextRequest, NextResponse } from "next/server";

// GET Request 
export async function GET(request: NextRequest) {
  // Handle GET request logic
  return NextResponse.json(data, { status: 200 });
}

// POST Request
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Handle POST request logic
  return NextResponse.json(newData, {
    { status: 201 }
  });
}

//PUT, DELETE, PATCH also possible
```

What happens in your route.ts

1. Import required modules

```ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prima from '@db/client'
```

`@db/client` Path config in tsconfig.json `"@db/client": ["./prisma/client.ts"]`

2. Schema validation with Zod

```ts
const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});
```

3. POST Function

```ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  //if valadation doesn't succed, throw 400 status, Bad Request
  if (!validation.success) {
    return NextResponse.json(validation.error.message, { status: 400 });
  }

  // Save to database
  const newIssue = await prisma.issue.create({
    data: validation.data,
  });

  return NextResponse.json(newIssue, { status: 201 });
}
```

**Important Points**:

- **NextRequest** = Incoming Request (with Body, Headers, etc.)

- **NextResponse** = Outgoing Response (JSON, Status Code)

- **Status Codes:**
  - `200` = OK (GET successful)
  - `201` = Created (POST successful)
  - `400` = Bad Request (Validation failed)
  - `404` = Not Found
  - `500` = Server Error

3. client.ts - Prisma Database Client

What client.ts does:

```ts
import { PrismaClient } from "../src/generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

```

**Why Use This Pattern**?
*The Problem*:

Without this: 

- Every API route creates a new database connection

- Next.js hot reload = 100s of database connections

- Result: "Too many connections" error

*The Solution*:

- One global Prisma instance for the entire app
- Development: Stored globally to survive hot reloads
- Production: Fresh instance per server (which is fine)

**Key Parts**:

- ?? operator: Use existing instance OR create new one

- globalThis: Works in all environments

- process.env.NODE_ENV: Only store globally in development

```ts
import prisma from '@db/client';

// Create
await prisma.issue.create({ data: { }})

//Read
await prisma.issue.findMany();

// Delete
await prisma.issue.delete({ where: { id: 1} })

// Update
await prisma.issue.update({
  where: { id: 1 },
  data: { title: 'Updated Title' }
});
```

4. Quick References

API Route Template:

```ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@db/client';

const schema = z.object({
  // your validation schema
});

export async function POST(request: NextRequest) {

  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.message }, 
        { status: 400 }
      );
    }
     // Your business logic here
    const result = await prisma.model.create({ data: body });
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
```

!important

- Folder structure matters!
`/api/issues/route.ts` = `/api/issues`
endpoint

- Always validate input with Zod or similar

- Use meaningful status codes (200, 201, 400, 404, 500)

- Test with Postman before building frontend

- Use console.log to debug

### Radix UI

Radix UI is a library of unstyled, accessible components for building React applications. It provides a set of primitives that you can style according to your design system. 

Installing it: 

```bash
npm install @radix-ui/react-accordion
```

Check all steps: [Radix Get Started](https://www.radix-ui.com/themes/docs/overview/getting-started)

with the `<ThemePanel />` Element you can check how your theme is applied to the components. Then you can easily copy it to the layout.tsx

### Importing something dynamically

```tsx
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-300 animate-pulse w-1/1 h-100 rounded" />
  ),
});
```

Hauptgründe für Dynamic Imports:

1. Server-Side-Rendering (SSR) Konfilkte

- Next.js rendert Seiten standardmäßig auf dem Server

- Viele React-Komponenten (wie SimpleMDE [das ist ein Markdown Editor in einer React-Web-Seite]) nutzen Browser-APIs (window, document, etc.)

- Diese APIs existieren auf dem Server nicht --> Fehler beim Build/Rendering

- `ssr: false` verhindert das serverseitige Rendern dieser Komponente

2. Bundle-Size Optimierung

- Die Komponente wird nur geladen, wenn sie tatsächlich benötigt wird (Code Splitting)

- Reduziert die initiale Bundle-Größe

- Bessere Performane, besonders bei größeren Editoren wie SimpleMDe

3. Conditional Loading

- Komponenten können basierend auf Bedinungen geladen werden

- Nützlich für Features, die nur unter bestimmten Umständen gebraucht werden

dass was bei loading steht wird dann während der lade Zeit angezeigt

### Next JS Deployment Trouble Shooting (with Vercel)

**Problem 1**: ESLint Error in Generated Files

Error:

```bash
Warning: Expected an assignment or function call and instead saw an expression.  @typescript-eslint/no-unused-expressions
```

Massive errors in files like `wasm-engine-edge` or other generated third-party-files

**Root Cause**:

- ESLint tries to check automatically generated files

- These files are not meant for human editing

- Results in "false positive" warnings

**Solution 1**: Ignore ESLint during build (Recommended)

```js
//next.config.js

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  // ... rest of config
};
```

**Solution 2**: Create .eslint ignore

```text
# .eslintignore
**/wasm-engine-edge*
**/*.wasm
**/node_modules
**/.next
**/dist
**/build
```

Thist is okay because:

- Errors are in third-party code you don't control

- Your own code still gets checked in the IDE

- Standard practice in production deployments

- The app work perfectly fine

**Problem 2**: Prisma Client Erron on Vercel

```bash
Error [PrismaClientInitializationError]: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered.
```

**Root Cause**:

- Vercel caches dependencies to speed up builds

- Prisma doesn't get automatically generated

- Build tries to use outdated Prisma Client

**Solution** (I choosed):

- Go to Vercel Dashboard --> Settings --> Build & Development Settings

- Build Command: `npx prisma generate && next build` or `prisma generate && npm run build`

- This ensures Prisma Client is generated during each build

**Important Note**: 

- **Database does NOT need to be running** for the build

- `prisma generate` only create client code, no DB connection needed

- DB connection is only needed at runtime

**For Production SetUp**:

1. Set up hosted database (PlanetScale, Supabase, Railway, etc.)

2. Set environment variables in Vercel:

    - `DATABASE_URL` = your database connection string (also in your .env file)
