import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getTag } from "../../services/tag";
import Header from "../../components/Header";
import { NavOptions } from "../../components/header/NavOptions";

import PostCard from "../../components/post/PostCard";
import ShowTags from "../../components/post/ShowTags";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { AtSymbolIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import SearchPosts from "../../components/post/SearchPosts";

import { parseCookies } from "nookies";
import axios from "axios";

export default function Tags({ tag, posts }) {
  const router = useRouter();

  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Topic: ${tag.name} | ${APP_NAME}`} />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Topic: ${tag.name} | ${APP_NAME}`}
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
  return (
    <>
      {head()}
      <div className=" max-w-7xl mx-auto">
        <Header>
          <SearchPosts />
        </Header>
        <header className="flex capitalize tracking-wider text-gray-600 text-3xl font-semibold py-4">
          {" "}
          <AtSymbolIcon className="h-8 w-8 text-gray-400 opacity-90" />{" "}
          {tag.name}
        </header>

        <div className="grid grid-cols-9 gap-16">
          <section className=" col-span-6">
            {posts.map((post, i) => (
              <article key={i}>
                <PostCard post={post} />
              </article>
            ))}
          </section>
          <ShowTags />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const slug = context.params.slug;
    const cookies = parseCookies(context);
    const { data } = await axios.get(`${API}/users/private`, {
      headers: {
        token: cookies.token,
      },
    });
    if (data.ok) {
      const result = await getTag(slug);

      if (!result) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          tag: result.tag,
          posts: result.posts,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "../signin",
      },
      props: {},
    };
  }
}
