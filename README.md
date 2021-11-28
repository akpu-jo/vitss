# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v2.2)](https://blog.tailwindcss.com/tailwindcss-2-2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

It uses the new [`Just-in-Time Mode`](https://tailwindcss.com/docs/just-in-time-mode) for Tailwind CSS.

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).


Post Page--------

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getCookie } from "../../actions/auth";
import { listPostsAndTags } from "../../actions/post";

import { Layout } from "../../components/Layout";
import PostCard from "../../components/post/PostCard";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const ListPost = ({
  posts,
  categories,
  tags,
  totalPosts,
  postsLimit,
  postSkip,
}) => {
  const router = useRouter();

  const head = () => (
    <Head>
      <title>Personal blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Truthful views on everyday life issues"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Truthful views on everyday life issues | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Truthful views on everyday life issues"
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${DOMAIN}/assets/logo.png`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/assets/logo.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(postsLimit);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(totalPosts);
  const [loadedPosts, setLoadedPosts] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listPostsAndTags(toSkip, limit).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setLoadedPosts([...loadedPosts, ...result.posts]);
        setSize(result.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load mmore
        </button>
      )
    );
  };

  const showLoadedPosts = () => {
    return loadedPosts.map((post, i) => (
      <article key={i}>
        <PostCard post={post} />
      </article>
    ));
  };

  const showAllPosts = () => {
    return posts.map((post, i) => {
      // ()
      return (
        <article key={i}>
          <PostCard post={post} />
          <hr />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tag/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };
  return (
    <>
      {head()}
      <Layout>
        {showAllTags()}
        {showAllPosts()}
        {showLoadedPosts()}
        <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  let skip = 0;
  let limit = 2;
  const token = getCookie("token");

  const result = await listPostsAndTags(skip, limit);
  console.log("result", result);

  if (!result) {
    return {
       notFound: true,
    };
  }

  return {
    props: {
      posts: result.posts,
      categories: result.categories,
      tags: result.tags,
      totalPosts: result.size,
      postsLimit: limit,
      postSkip: skip,
    },
  };
}

export default ListPost;
