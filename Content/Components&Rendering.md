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

##  Server Components

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

##  Client Components

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




