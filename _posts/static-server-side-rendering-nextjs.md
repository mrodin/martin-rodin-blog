---
title: "Static and server-side rendering with Next.js"
excerpt: "Server side rendering can be a complicated matter. Let me show you how you can use Next.js to seamlessly combine static and server side rendering in a single project."
coverImage: "/assets/blog/covers/static-server-side-rendering-nextjs.jpg"
date: "2021-01-01"
author:
    name: Martin Rodin
    picture: "/assets/blog/authors/martin.jpg"
ogImage:
    url: "/assets/blog/covers/static-server-side-rendering-nextjs.jpg"
---

Lately, I’ve been getting into Next.js and it’s been an awesome experience so far. Next.js is a React framework that allows you to seamlessly combine static and server-side rendering in your project. What is the difference?

**Static rendering**: if you use static rendering, your site (or certain page) is pre-rendered into static HTML files in advance during build time. These pre-rendered files can then be served right away without the server doing any additional work. This is especially suitable for pages that don’t use any dynamic data (think About Us or Contact pages on a typical web site). But what if you need to fetch some live data to be able to generate the contents of the page?

**Server-side rendering (SSR)**: when using SSR, the page is rendered on the server at the time of the request (when the user visits the page) and then served to the client. This is very useful when you need to fetch some data from the database and generate content around this data:

-   User visits the page
-   The server queries the DB to get the data needed to generate the page
-   When the data is available, the server generates the page
-   Once the page is generated, it is sent to the client (web browser)

Static rendering has the advantage of better performance since you skip the step of rendering the page on the server. On the other hand, if you need to work with live data, you will either need to use server-side rendering or some kind of hybrid approach (serve part of the page statically and fetch the data during runtime). We are going to talk about the hybrid solution later in this article.

## Example project: Tech news website

We are going to build a simple tech news website that aggregates articles from various news sources. There are going to be following pages:

-   **Top headlines**: this is going to be the index page of our app and will display top headlines across all news sources. Since the top news can change rapidly, we are going to render this page on the server (SSR) with each client request to make sure that it’s always up to date.
-   **Sources**: sources page will show a list of all news sources. It’s going to be statically rendered since the news sources are rarely changed.
-   **Source detail**: for each news source, there is going to be a source detail page that will show its top headlines. We are going to render the detail page statically, but we will also utilize incremental static regeneration to update the headlines frequently.

### GitHub repository

If you want to check the complete code of this example project, head to my [GitHub profile](https://github.com/mrodin/next-ssr-demo):

If you want to get the project running on your computer, you are also going to need a NewsAPI key. It’s free and you can get on [https://newsapi.org](https://newsapi.org).

## Top headlines page: Server side rendering

Let’s start with the top headlines page. This page gets pre-rendered on the server on every user visit to make sure that the data is always up to date.

To do so, we need to export the `getServerSideProps` function from the respective page (index.js page in my example).

```js
// If the page exports getServerSideProps function,
// it's going to be pre-rendered on server on
// EVERY request. Next.js will inject the props object
// into the page component.
export async function getServerSideProps() {
    return {
        props: {
            topHeadlines: await getTopHeadlines(),
        },
    };
}
```

The `getTopHeadlines` function is a simple wrapper function around JS fetch. It looks like this:

```js
export const getTopHeadlines = async () => {
    const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`
    );
    if (res.ok) {
        const topHeadlinesJson = await res.json();
        return topHeadlinesJson.articles;
    } else {
        return [];
    }
};
```

## News sources page: Static generation

Since the news sources rarely change, we are going to make this page completely static and generate it on build time. The way we do this is very similar to the previous example, but we are going to export `getStaticProps` function from the page instead of `getServerSideProps`.

```js
// getStaticProps function is going to run only
// on project build. Just like in case of
// getServerSideProps, Next.js will provide the
// props object to the page component.
export async function getStaticProps() {
    return {
        props: {
            sources: await getSources(),
        },
    };
}
```

Static content generation has many advantages:

-   **Performance and caching** - this page will turn into a completely static HTML file. It means that whenever a user accesses this page, it is ready to be served straight away without running any additional operation (script, API call, etc.) on the server. This naturally leads to better performance. Also, static files can be cached on the CDN - for example if you use Vercel, the caching of static files is [enabled by default](https://vercel.com/docs/edge-network/caching).
-   **No backend dependency** - since the pages are pre-rendered during build time, there is no need to query the backend (API, database, etc.) on run time. So even if your backend is down, the static pages will still be available to the users.
-   **Improved security** - static files are much less prone to security issues. Since there is no database to be queried during runtime, hackers cannot perform SQL injection attacks or abuse server side security holes.

One very obvious disadvantage of this approach is that when we want to add another news source, we would need to rebuild the app. This example is a bit contrived and we probably wouldn’t want to do this in a real app, but static generation is still very useful for pages that don’t really change much (e.g. blog posts, about us pages, contact pages and so on).

In the next section, I’m also going to show how to get around this drawback with Next.js built-in incremental static generation or by combining static with runtime data fetching.

## Source detail page: Incremental static regeneration

Last page we are going to build is a detail page for each news source. When visited, it is going to show the top headlines for each source. The difference with this page is that it uses a dynamic route. For example, if you want to see the top headlines of TechCrunch, it’s available on this URL (in development mode):

`localhost:3000/source/techcrunch`

In Next.js we can create dynamic route using brackets, e.g.:

`pages/source/[id].js`

Now when we want to pre-render a dynamic route page using `getStaticProps`, we need to provide a complete list of static paths (all valid news sources) that Next.js should render during build time. We can do this with the `getStaticPaths` function.

```js
export async function getStaticPaths() {
    const sources = await getSources();
    const paths = sources.map((source) => ({
        params: { id: source.id },
    }));

    return { paths, fallback: false };
}
```

In `getStaticPaths` we will firstly fetch all the news sources from an API to get the complete list of all of them and store them into a `sources` constant. Then we create a `paths` constant which will contain an array of objects with `params` key. In our case the `paths` array is going to look like this:

```js
const paths = [
       { params: { id: "engadget" } },
       { params: { id: "hacker-news" } },
       { params: { id: "techcrunch" } },
       ...
];
```

This way Next.js will pre-render `source/engadget`, `source/hacker-news`, etc. using the dynamic page `pages/source/[id].js`. Note that the value for each `params` must match the parameter in the page name. In our case, we have a page called `[id].js`, so the key inside the `params` object must also be `id`.

Now that we have our `getStaticPaths` function, we will also need to export a `getStaticProps` function to tell Next.js that our source detail page should be statically pre-rendered during build time.

```js
export async function getStaticProps({ params }) {
    return {
        props: {
            headlines: await getSourceHeadlines(params.id),
        },
    };
}
```

Notice that `getStaticProps` function takes parameter `context`, which we destructure to obtain a `params` object containing the route parameters for the page. In our case, the `params` will look like e.g. `{ id: engadget }`. So we can use the `params.id` to get the list of headlines from the corresponding news source.

Well, this is going to work nicely, but we will soon encounter a problem with out of date headlines on our source detail pages since the data are generated only at build time. We are going to look at the solution to this problem in the next section.

### Incremental static regeneration

Incremental static regeneration is a feature of Next.js that allows you to “re-generate” (meaning update) static pages as users visit your website. You can enable this feature in code using the `revalidate` parameter in the return of your `getStaticProps` function.

```js
export async function getStaticProps({ params }) {
    return {
        props: {
            headlines: await getSourceHeadlines(params.id),
        },
        // With revalidate: 1, Next.js will regenerate our source
        // detail page every time a user comes to visit it, but at
        // most every 1 second.
        revalidate: 1,
    };
}
```

Now when a user visits our source detail page, he will get served the last generated version of the page immediately, but in the background, the page will be regenerated with new data, so the next coming visitor will see the up to date information. By using incremental static regeneration a small portion of users will get to see stale data, but the page keeps updating itself constantly on every visit without the need to rebuild and redeploy the app.

## Conclusion

In this article we have seen how you can seamlessly combine static and server side rendering in the same application using Next.js data fetching API. On the page level, you can configure either a full server side rendering or complete static generation during build time. The incremental static regeneration is useful when you want to refresh your static pages as the requests come.
