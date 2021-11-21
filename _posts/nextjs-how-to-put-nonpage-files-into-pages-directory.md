---
title: "Next.js: How to put non-page files into pages directory"
excerpt: "Improve the structure of your Next.js project by collocating all your module files in pages directory."
coverImage: "/assets/blog/covers/nextjs-how-to-put-nonpage-files-into-pages-directory.jpg"
date: "2021-11-21"
author:
    name: Martin Rodin
    picture: "/assets/blog/authors/martin.jpg"
ogImage:
    url: "/assets/blog/covers/nextjs-how-to-put-nonpage-files-into-pages-directory.jpg"
---

One thing that always bugged me about Next.js was the fact that I was unable to collocate my code with the particular route in the `pages` directory. It was a long standing rule that you shouldn’t put any non-page files in your `pages` folder because Next.js automatically treats every file there as a new route.

But now it seems that you can define custom page extensions that allow you to collocate your module files with the route they belong to.

In all larger code bases, I use a [folder-by-feature](https://softwareengineering.stackexchange.com/a/338610) approach to structure my app. Typically my Next.js code base looked something like this:

```js
|- pages // Next.js pages
   |- products.tsx
   |- shopping-cart.tsx
   |- users.tsx
|- modules // each module corresponds to particular page
   |- products
       |- actions.ts
       |- constants.ts
       |- Container.tsx
       |- index.ts
       |- reducer.ts
       |- selectors.ts
   |- shoppingCart
       |- actions.ts
       |- constants.ts
       |- Container.tsx
       |- index.ts
       |- reducer.ts
       |- selectors.ts
```

With a structure like this, I would then import the Container component in the page and export it as default:

```js
// products.ts page
import { Container } from 'modules/products';
 
export default Container;
```

Is there a way to collocate the module files with the page file? Let’s find out.

## Next.js custom page extensions

To be able to put non-page files into the `pages` directory, you need to tell Next.js how to differentiate between pages and the rest of the files. You can do this in the `next.config.js` file. If this file doesn’t exist in your project yet, simply create it in the root folder (next to `package.json` file) using `touch` command:

```shell
touch next.config.js
```

Then we would like to specify that only files with `.page.tsx|ts|jsx|js` extensions (for example `products.page.tsx`) should be considered page files. Add this configuration into your `next.config.js` file:

```js
module.exports = {
   pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
}
```

With this configuration, we can collocate all the module files into one folder. Our structure would look something like that now:

```js
|- pages // Next.js pages
   |- products
       |- actions.ts
       |- constants.ts
       |- Container.tsx
       |- index.page.ts // this is now our page file
       |- reducer.ts
       |- selectors.ts
   |- shopping-cart
       |- actions.ts
       |- constants.ts
       |- Container.tsx
       |- index.page.ts
       |- reducer.ts
       |- selectors.ts
```

We moved all our module files into the pages folder and defined `index.page.ts` as our page file.

Hope this little tip made your work with Next.js more pleasant!
