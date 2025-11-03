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




## Rendern allgemein
Was ist rendern?
build Zeit



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



If a page uses Server-side Rendering, the page HTML is generated on each request.
To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. This function will be called by the server on every request.
For example, suppose that your page needs to pre-render frequently updated data (fetched from an external API). You can write getServerSideProps which fetches this data and passes it to Page like below:



``` export default function Page({ data }) {
  // Render data...
}
 
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}
```

As you can see, getServerSideProps is similar to getStaticProps, but the difference is that getServerSideProps is run on every request instead of on build time.






## Static Side Generation (Pre-rendering)


https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fpages-router%2Fdata-fetching%2Fstatic-generation.png&w=1920&q=75<img width="1386" height="744" alt="image" src="https://github.com/user-attachments/assets/bc58d5ee-a5d9-4d5b-a410-e56a74b0a2c8" />




If a page uses Static Generation, the page HTML is generated at build time. That means in production, the page HTML is generated when you run next build. This HTML will then be reused on each request. It can be cached by a CDN.
In Next.js, you can statically generate pages with or without data. Let's take a look at each case.

Static Generation without data
By default, Next.js pre-renders pages using Static Generation without fetching data. Here's an example:

```
function About() {
  return <div>About</div>
}
 
export default About
```
Note that this page does not need to fetch any external data to be pre-rendered. In cases like this, Next.js generates a single HTML file per page during build time.


Static Generation with data
Some pages require fetching external data for pre-rendering. There are two scenarios, and one or both might apply. In each case, you can use these functions that Next.js provides:
Your page content depends on external data: Use getStaticProps.
Your page paths depend on external data: Use getStaticPaths (usually in addition to getStaticProps).
Scenario 1: Your page content depends on external data
Example: Your blog page might need to fetch the list of blog posts from a CMS (content management system).

```
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}
```

To fetch this data on pre-render, Next.js allows you to export an async function called getStaticProps from the same file. This function gets called at build time and lets you pass fetched data to the page's props on pre-render.


```
export default function Blog({ posts }) {
  // Render posts...
}
 
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}
```


Scenario 2: Your page paths depend on external data
Next.js allows you to create pages with dynamic routes. For example, you can create a file called pages/posts/[id].js to show a single blog post based on id. This will allow you to show a blog post with id: 1 when you access posts/1.


However, which id you want to pre-render at build time might depend on external data.
Example: suppose that you've only added one blog post (with id: 1) to the database. In this case, you'd only want to pre-render posts/1 at build time.
Later, you might add the second post with id: 2. Then you'd want to pre-render posts/2 as well.
So your page paths that are pre-rendered depend on external data. To handle this, Next.js lets you export an async function called getStaticPaths from a dynamic page (pages/posts/[id].js in this case). This function gets called at build time and lets you specify which paths you want to pre-render.

```
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
``


Also in pages/posts/[id].js, you need to export getStaticProps so that you can fetch the data about the post with this id and use it to pre-render the page:

```
export default function Post({ post }) {
  // Render post...
}
 
export async function getStaticPaths() {
  // ...
}
 
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
 
  // Pass post data to the page via props
  return { props: { post } }
}
``



When should I use Static Generation?
We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.
You can use Static Generation for many types of pages, including:
Marketing pages
Blog posts and portfolios
E-commerce product listings
Help and documentation
You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.
On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.
In cases like this, you can do one of the following:
Use Static Generation with Client-side data fetching: You can skip pre-rendering some parts of a page and then use client-side JavaScript to populate them. To learn more about this approach, check out the Data Fetching documentation.
Use Server-Side Rendering: Next.js pre-renders a page on each request. It will be slower because the page cannot be cached by a CDN, but the pre-rendered page will always be up-to-date. We'll talk about this approach below.


## Incremental Static Regeneration (pre-rendering)
https://nextjs.org/docs/pages/guides/incremental-static-regeneration:
Incremental Static Regeneration (ISR) enables you to:
- Update static content without rebuilding the entire site
- Reduce server load by serving prerendered, static pages for most requests
- Ensure proper cache-control headers are automatically added to pages
- Handle large amounts of content pages without long next build times


```
typescript
import type { GetStaticPaths, GetStaticProps } from 'next'
 
interface Post {
  id: string
  title: string
  content: string
}
 
interface Props {
  post: Post
}
 
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  const paths = posts.map((post: Post) => ({
    params: { id: String(post.id) },
  }))
 
  return { paths, fallback: 'blocking' }
}
 
export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: {
  params: { id: string }
}) => {
  const post = await fetch(`https://api.vercel.app/blog/${params.id}`).then(
    (res) => res.json()
  )
 
  return {
    props: { post },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: 60,
  }
}
 
export default function Page({ post }: Props) {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```

1. During next build, all known blog posts are generated
2. All requests made to these pages (e.g. /blog/1) are cached and instantaneous
3. After 60 seconds has passed, the next request will still return the cached (now stale) page
4. The cache is invalidated and a new version of the page begins generating in the background
5. Once generated successfully, the next request will return the updated page and cache it for subsequent requests
6. If /blog/26 is requested, and it exists, the page will be generated on-demand. This behavior can be changed by using a different fallback value. However, if the post does not exist, then 404 is returned.


https://robslog.com/wp-content/uploads/2023/11/incremental-static-regeneration-nextjs-1024x565.png<img width="1024" height="565" alt="image" src="https://github.com/user-attachments/assets/936cbfd8-0a82-4f9e-a60d-deabe9207f6b" />



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




