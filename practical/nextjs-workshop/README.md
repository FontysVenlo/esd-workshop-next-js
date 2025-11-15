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

---
## ```app/server/page.tsx (Server-side Houses Page)```

This is a **Server Component**.

- Fetches houses **on the server** using ```fetch()``` with ```cache: "no-store"```.
- Renders a ```<HouseList/>``` with the fetched data.
- Demonstrates SSR-style rendering.

### Your Tasks

- **T3 - Add a server-side console.log**  
    Inside ```fetchHouses()```, add:

  ```typescript
  console.log("Fetching houses on the server");
  ```

Refresh ```/server``` and look at the **terminal**, not the browser console.

- **T4 - Be ready to explain:**
  - Where does this code run? (On the server)
  - Why does it run on every request? (Because of ```cache: "no-store"```)
---
## ```app/client/page.tsx (Client-side Houses Page)```

This is a **Client Component** (```"use client"```).

- Uses ```useEffect``` to fetch data **in the browser**.
- Uses React state (```useState```) to manage loading state and houses.
- Renders ```<HouseList />``` and ```<HouseForm />```.
- Demonstrates CSR-style interaction.

### Your Tasks

- **T5 - Compare SSR vs CSR**  
    Compare:
  - ```useEffect``` (CSR)
  - ```fetchHouses()``` in server page (SSR)

   Answer these:
  
  - Where do they run?
  - When do they run?
- **T6 - Improve the loading UI**  
    Change the "Loading…" text to a styled message using Tailwind, e.g.:
- ```typescript
  <p className="text-sm text-slate-400">Loading houses from the API…</p>
  ```
---
## ```app/api/time/route.ts```

Simple API endpoint that returns the current timestamp.

### Your Tasks

- **T7 - Extend the JSON response**  
    Add more fields, for example:
  ```typescript
  return NextResponse.json({
  now: new Date().toISOString(),
  message: "Hello from /api/time",
  workshop: "Next.js ESDE",
  author: "Your Name"
  });
  ```
- **T8 - Use this endpoint somewhere (optional)**  
    Create a new page or update ```app/page.tsx``` to fetch and display the time.
---
## ```app/api/houses/route.ts```

A small REST-like API:

- ```GET``` returns all houses.
- ```POST``` adds a new house.
- Uses an in-memory array (resets on server restart).

### Your Tasks

- **T9 - Add a new initial house**  
    Modify the initial array:
```typescript
 let houses = [
 { id: 1, name: "Starter Apartment", rooms: 2, type: "Apartment" },
 { id: 2, name: "Family Home", rooms: 5, type: "Detached" },
 { id: 3, name: "Dream Loft", rooms: 4, type: "Apartment" }
 ];
```
- **T10 - Add validation (optional)**  
    For example:
  - Name cannot be empty.
  - Rooms must be > 0.
  - If invalid, return a 400 JSON response.
---
## ```components/NavBar.tsx```

Simple Tailwind-powered navigation component.

### Your Tasks

- **T11 - Style or improve the navbar**  
    For example:
  - Make one link look "active"
  - Add hover transitions
  - Use ```usePathname()``` (advanced) to highlight the current page
---
## ```components/HouseList.tsx```

Displays a list of houses.

**Your Tasks**

- **T12 - Add a new field**  
    For example: ```city``` or ```price```
    Steps:
  - Add it to the ```House``` TypeScript interface.
  - Add it into the initial array in ```/api/houses```.
  - Display it inside the list UI.
- **T13 - Style the cards**  
    Use Tailwind utilities to change:
  - Border
  - Shadow
  - Padding
  - Font size
    
Make it look like your own version.

---
## ```components/HouseForm.tsx```

Client-side form component used on ```/client```.

Contains placeholders and TODOs.

### Your Tasks

- **T14 - Implement ```handleSubmit```:**

  Steps:
  1. Set loading:
  ```typescript
  setLoading(true);
  ```
   2. Send POST call:
  ```typescript
  const res = await fetch("/api/houses", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, rooms, type })
  });
  ```
   3. Handle errors:
  ```typescript
   if (!res.ok) {
     setError("Failed to create house");
     setLoading(false);
   return;
   }
  ```
   4. Parse JSON:
  ```typescript
   const data = await res.json();
  ```
   5. Call callback from parent:
  ```typescript
   onHouseCreated(data.house);
  ```
   6. Reset form:
  ```typescript
   setName("");
   setRooms(3);
   setType("Apartment");
   setLoading(false);
  ```
- **T15 - Add validation**  
    Example:
  ```typescript
   if (!name.trim()) {
     setError("Please enter a house name.");
   return;
   }
   if (rooms < 1) {
     setError("Rooms must be at least 1.");
   return;
   }
  ```

- **T16 - UX improvements (optional)**
  - Disable button while loading.
  - Add success message.
  - Add animations (e.g., Tailwind transitions).
---
## 3. Data Flow Summary

Here's the full picture:

### ```/api/houses```

- ```GET``` → return all houses
- ```POST``` → create new house

### ```/server```

- Runs **only on server**
- Uses ```fetch(..., { cache: "no-store" })```
- Good for SEO & initial load

### ```/client```

- Runs in the **browser**
- Uses ```useEffect()``` to fetch data
- Updates React state dynamically
- Creates houses with the ```<HouseForm />```
---
## 4. Bonus Challenges (Optional)

If you finish early, try one or more:

- **B1 - Detail page:**  
    Create ```/server/[id]/page.tsx``` for individual house details.
- **B2 - Filtering on the client:**  
    Add a select dropdown that filters houses by type.
- **B3 - Improve ```/api/time``` and show timestamp on ```/server```:**  
    Demonstrate SSR + API mixing.
---
## 5. Resetting Data

The houses are stored in memory inside the API route.

The data resets anytime you:

- Restart ```npm run dev```
- Save changes to the file (hot reload)
---
## 6. Summary

By completing this workshop you will learn:

- The difference between **Server Components** and **Client Components**
- How to implement **API Routes** in the App Router
- How to use Tailwind effectively inside Next.js
- How to create forms and POST requests using TypeScript
- How SSR and CSR differ in behavior and rendering

This small app gives you a foundation for building real-world Next.js applications.

Happy coding!

### Berkay & Jan !
