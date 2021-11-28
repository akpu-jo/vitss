import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FeaturedPost from "../components/post/FeaturedPost";
import HotTopic from "../components/post/HotTopic";
import RecentPosts from "../components/post/RecentPosts";
import SearchPosts from "../components/post/SearchPosts";
import { useContext } from "react";

import { getRecentPosts } from "../services/post";
import { Context } from "../contexts/AppContext";

import { parseCookies } from "nookies";
import axios from "axios";
import { API } from "../config";

export default function Home({ posts }) {
  const { state } = useContext(Context);
  return (
    <>
      <div className=" bg-gray-200 pb-10">
        <Header>
          <SearchPosts />
        </Header>
        <RecentPosts posts={posts} />
      </div>
      <FeaturedPost />
      <HotTopic slug={`dating`} />
      <HotTopic slug={`new-tag`} />
      <Footer />
      {/* <Topics /> */}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    console.log(API)
    const cookies = parseCookies(context);
    const { data } = await axios.get(`${API}/users/private`, {
      headers: {
        token: cookies.token,
      },
    });
    if (data.ok){
          const result = await getRecentPosts();
      
          if (!result) {
            return {
              notFound: true,
            };
          }
      
            return {
          props: {
            posts: result.posts,
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
