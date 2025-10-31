# What is a Component (1–2 min)

- In React (and thus in Next.js), everything is a **component** — reusable, self-contained UI blocks.
- Components can be:
  - **Functional Components** (modern standard)
  - **Server or Client Components** (Next.js 13+ feature)

## Example

```jsx
// app/components/Button.jsx
export default function Button({ label }) {
  return <button>{label}</button>;
}
```

---

## **Component Hierarchy & Composition (2 min)**

- Components are **nested** to build complex UIs:
  - `Layout` → `Page` → `Section` → `Component`
- In Next.js, the file structure reflects the component hierarchy in the **App Router**:

```jsx
app/
├─ layout.jsx
├─ page.jsx
├─ components/
│ ├─ Header.jsx
│ ├─ Footer.jsx
```

# Rendering Types (5–6 min)


https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qtbY8twpsF6WBghrpz4fXg.png<img width="1400" height="933" alt="image" src="https://github.com/user-attachments/assets/f3fa45f9-1f51-4c88-a0a2-4a815469cb29" />



##  Server Side Rendering - Server Components (Pre-rendering)






- **Default** in Next.js 13+ App Router.
- Rendered **on the server**, sent as static HTML to the browser.
- **Advantages:**
  - Better SEO
  - Faster first load (no JS needed for rendering)
  - Secure (no client data exposure)

### Example

```jsx
// Server Component
export default async function ProductList() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
```


https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fpages-router%2Fdata-fetching%2Fserver-side-rendering.png&w=1920&q=75<img width="1386" height="800" alt="image" src="https://github.com/user-attachments/assets/40c8334d-3e48-4849-b35e-c741f6de4310" />


## Static Side Generation (Pre-rendering)


https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fpages-router%2Fdata-fetching%2Fstatic-generation.png&w=1920&q=75<img width="1386" height="744" alt="image" src="https://github.com/user-attachments/assets/bc58d5ee-a5d9-4d5b-a410-e56a74b0a2c8" />




## Incremental Static Regeneration (pre-rendering)





##  Client Side Rendering - Client Components

- Rendered in the **Browser**.
- Needed for **interactivity** (state, event handlers, etc.)
- Must include `'use client'` at the top
  
```jsx
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```


https://tutorialsight.com/content/images/size/w1600/2023/01/client-side-rendering.webp<img width="1600" height="1200" alt="image" src="https://github.com/user-attachments/assets/e3ddca62-88c2-4d89-be4c-39615801bc5b" />



# Summary & Transition (1 min)

- Next.js lets you **mix Server & Client Components** for optimal performance.
- Server components handle data and structure.
- Client components handle interactivity.
- **Next section:** *Interaction House Building* — shows how this affects **Server vs Client Side Rendering**.

- # Key Takeaways

- Components are the **building blocks** of Next.js applications.
- Use **Server Components** for static or data-fetching views.
- Use **Client Components** for interactivity (state, events).
- Mixing both gives you the **best performance + UX** balance.




