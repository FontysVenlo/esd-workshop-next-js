# Next.js Workshop – House Builder (TypeScript + Tailwind)

Welcome to the practical part of the workshop.  
In this exercise you will build a small **“House Builder”** application using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- API Routes
- Server Components (SSR-style data fetching)
- Client Components (CSR-style data fetching + form handling)

The repository contains a few **TODOs**, which you will complete during the workshop step-by-step.

---

# 1. Getting Started

## Requirements

- Node.js (LTS)
- npm or yarn
- Git

## Install & Run

```bash
git clone <this-repo-url> nextjs-workshop
cd nextjs-workshop
npm install
npm run dev
```

Open the app: 👉 http://localhost:3000

# 2. Project Structure Overview

Below you will find **what each file does** and **what you are supposed to do in each**.
This is your guide for the hands-on part.

---
## ```app/layout.tsx ```


The global layout for the entire application.
- Wraps every page.
- Defines ```<html>```, ```<body>```, and the main container.
- Loads global Tailwind styles`

### Your Tasks
- **(Optional):** Adjust global layout styling (e.g., padding, background, or container size).
- **Understand:** This file provides the shared layout for all pages.

---
## ```app/page.tsx (Home Page)```

Landing page with introductory text and navigation.

### Your Tasks
- **T1** -  **Add a short intro text** <br>Add two or three sentences describing what participants will build or learn
- **T2** - **Add a link/button to** ```/client```
Use ```<Link href="/client">Go to Client Page</Link>``` so it's easy to start the interactive part.
