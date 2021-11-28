import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import moment from "moment";
import renderHTML from "react-render-html";

import { useRouter, withRouter } from "next/router";
import { getPost, getRelatedPosts } from "../../../services/post";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../../config";
import SearchPosts from "../../../components/post/SearchPosts";
import Header from "../../../components/Header";

import { parseCookies } from "nookies";
import axios from "axios";

const Post = ({ post }) => {
  const router = useRouter();
  const [relatedPosts, setRelatedPosts] = useState([]);

  const loadRelatedPosts = () => {
    getRelatedPosts(post).then((data) => {
      if (data.error) {
        console.log(data.message);
      } else {
        setRelatedPosts(data.posts);
      }
    });
    console.log(relatedPosts);
  };

  useEffect(() => {
    loadRelatedPosts();
  }, []);

  const head = () => (
    <Head>
      <title>
        {post.title} | {APP_NAME}
      </title>
      <meta name="description" content={post.mdesc} />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`${post.title} | ${APP_NAME}`} />
      <meta property="og:description" content={post.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/posts/photo/${post.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/posts/photo/${post.slug}`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <>
      {head()}
      <Header>
        <SearchPosts />
      </Header>
      <div className=" max-w-6xl mx-auto">
        <header className="max-w-2xl mx-auto">
          <h2 className="pt-2 pb-2 text-5xl text-gray-600 leading-normal tracking-wider font-medium font-serif">
            {post.title}
          </h2>
          <div className="flex justify-between items-center py-2 text-gray-500 text-base font-extralight">
            <section>
              {post.tags.length > 0 &&
                post.tags.map((t, i) => (
                  <Link key={i} href={`/tags/${t.slug}`}>
                    <a className="pb-1 px-2 rounded-sm bg-gray-200 hover:bg-gray-300 mr-1">
                      {t.name}
                    </a>
                  </Link>
                ))}
              {/* {postTags(post)} */}
            </section>
            <div className="text-gray-500">
              Published {moment(post.updatedAt).format("ll")}
            </div>
          </div>
        </header>
        <figure className="block py-4">
          <Image
            className=" object-cover "
            src={`${API}/posts/photo/${post.slug}`}
            alt=""
            layout="responsive"
            width={500}
            height={250}
          />
        </figure>
        <article>
          <div className="max-w-2xl py-6 mx-auto text-gray-600 text-xl font-base leading-relaxed tracking-wide">
            {renderHTML(post.body)}
          </div>
        </article>

        <div className="bg-gray-100 m-14">
          <header className=" text-lg font-semibold tracking-wider text-gray-500 px-5 pt-3">
            <h2>Related Posts</h2>
          </header>
          <div className=" p-5  flex justify-center items-center">
            {relatedPosts.map((post, i) => (
              <div
                key={i}
                className=" relative container w-80 h-96 mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 duration-500"
              >
                <Link href={`/p/${post.slug}`}>
                  <a>
                    <img
                      className="w-full h-full object-cover"
                      src={`${API}/posts/photo/${post.slug}`}
                      alt=""
                    />
                  </a>
                </Link>

                <div className="text-center bg-gray-100 absolute bottom-0 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-11/12 p-2 m-3 ">
                  <Link href={`/p/${post.slug}`}>
                    <a>
                      <h2 className="pt-2 pb-2 text-2xl font-sans font-semibold text-gray-600 hover:text-gray-800 cursor-pointer">
                        {post.title}
                      </h2>
                    </a>
                  </Link>
                  <span className="text-base text-gray-700 hover:text-gray-900">
                    <div className="text-gray-500 pt-2">
                      Published {moment(post.updatedAt).format("ll")}
                    </div>{" "}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


export async function getServerSideProps(context) {
  try {
    const slug = context.params.slug;
    const cookies = parseCookies(context);
    const { data } = await axios.get(`${API}/users/private`, {
      headers: {
        token: cookies.token,
      },
    });
    if (data.ok){

      
      const result =   await getPost(slug);

      
          if (!result) {
            return {
              notFound: true,
            };
          }
      
            return {
          props: {
            post: result.post,
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

export default withRouter(Post);
