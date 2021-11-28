import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllPosts } from "../../services/post";
import Header from "../../components/Header";

import { Layout } from "../../components/Layout";
import PostCard from "../../components/post/PostCard";
import SearchPosts from "../../components/post/SearchPosts";
import ShowTags from "../../components/post/ShowTags";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

import { parseCookies } from "nookies";
import axios from "axios";

const ListPost = ({ res, totalPosts }) => {
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

  const [posts, setPosts] = useState(res);
  const [hasMore, setHasMore] = useState(true);

  const getMorePosts = async () => {
    const newPosts = await getAllPosts(5, posts.length);
    setPosts((posts) => [...posts, ...newPosts.posts]);
  };

  useEffect(() => {
    setHasMore(totalPosts > posts.length ? true : false);
  }, [posts]);

  return (
    <>
      {head()}
        <Header >
          <SearchPosts />
        </Header>
        <div className=" max-w-7xl mx-auto grid grid-cols-9 gap-16 mt-5">
          <section className=" col-span-6">
            <InfiniteScroll
              dataLength={posts.length}
              next={getMorePosts}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>...</b>
                </p>
              }
            >
              {posts.map((post, i) => (
                <article key={i}>
                  <PostCard post={post} />
                </article>
              ))}
            </InfiniteScroll>
          </section>
          <ShowTags />
        </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context);
    const { data } = await axios.get(`${API}/users/private`, {
      headers: {
        token: cookies.token,
      },
    });
    if (data.ok){

      
      const result = await getAllPosts(5);
      
          if (!result) {
            return {
              notFound: true,
            };
          }
      
            return {
          props: {
            res: result.posts,
            totalPosts: result.count,
          },
        };
    }

  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "./signin",
      },
      props: {},
    };
  }
}


export default ListPost;
