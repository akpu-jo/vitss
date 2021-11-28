import React, { useEffect, useState } from "react";

import Link from "next/link";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";
import {
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";

import { API } from "../../config";
import { getFeaturedPosts } from "../../services/post";

const FeaturedPost = () => {
  const [posts, setPosts] = useState([]);

  const getFeatured = async () => {
    const data = await getFeaturedPosts();
    setPosts(data.posts);
  };

  useEffect(() => {
    getFeatured();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer rounded-full">
      <ArrowNarrowLeftIcon className="h-8 w-8 text-gray-800 opacity-90" />{" "}
    </div>
  );

  const customRightArrow = (
    <div className="absolute right-0 text-center py-3 cursor-pointer">
      <ArrowNarrowRightIcon className="h-8 w-8 text-gray-800 opacity-90" />{" "}
    </div>
  );

  return (
    <div className=" max-w-7xl mx-auto">
      <h2 className="flex capitalize tracking-wider text-gray-600 text-xl font-serif font-semibold py-4">
        {" "}
        Featured Posts
      </h2>
      <Carousel
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {posts.map((post, i) => (
          <>
            <div key={i} className=" bg-gray-100 rounded-xl">
              <div className="pb-2 rounded-xl">
                <figure class="md:grid grid-cols-9 bg-gray-100 rounded-xl p-8 md:p-0">
                  <div className="relative col-span-4 m-2 overflow-hidden hover:shadow-2xl transform hover:scale-105 duration-500">
                    <img
                      className=" object-cover rounded-xl w-40 h-40"
                      src={`${API}/posts/photo/${post.slug}`}
                      alt=""
                    />
                  </div>

                  <div className=" self-center col-span-5 pt-3 md:p-4 text-center md:text-left space-y-2">
                    <h2 className=" ">
                      <Link href={`/p/${post.slug}`}>
                        <a>
                          <h2 className="pt-2 pb-2 text-xl text-gray-600 font-semibold">
                            {post.title}
                          </h2>
                        </a>
                      </Link>
                      <div className="text-gray-400">
                        {moment(post.updatedAt).fromNow()}
                      </div>
                    </h2>
                  </div>
                </figure>
              </div>
            </div>
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPost;
