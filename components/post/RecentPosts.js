import React from "react";

import Link from "next/link";
import Image from "next/image";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";
import {
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";

import { API } from "../../config";

const RecentPosts = ({ posts }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
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
      <ArrowNarrowLeftIcon className="h-8 w-8 text-primary-brick opacity-90" />{" "}
    </div>
  );

  const customRightArrow = (
    <div className="absolute right-0 text-center py-3 cursor-pointer">
      <ArrowNarrowRightIcon className="h-8 w-8 text-primary-brick opacity-90" />{" "}
    </div>
  );

  return (
    <div className=" max-w-7xl mx-auto">
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {posts.map((post, i) => (
          <>
            <div
              key={i}
              className=" relative flex overflow-hidden hover:shadow-2xl transform hover:scale-105 duration-500"
            >
              <Link href={`/p/${post.slug}`}>
                <a>
                  <Image
                    className=" object-cover "
                    src={`${API}/posts/photo/${post.slug}`}
                    alt=""
                    width={500}
                    height={500}
                    quality={50}
                  />
                </a>
              </Link>
              <div className="bg-gradient-to-t from-secondary-black w-full absolute bottom-0">
                <section className=" my-6 grid grid-cols-10 items-end">
                  <Link href={`/p/${post.slug}`}>
                    <a className="self-center col-span-8 px-6">
                      <h2 className="  text-2xl font-serif font-semibold text-gray-200 hover:text-gray-800 cursor-pointer">
                        {post.title}
                      </h2>
                    </a>
                  </Link>
                  <div className="px-6 border-l-2 border-gray-400 col-span-2 text-gray-100 self-center">
                    {moment(post.updatedAt).format("ll")}
                  </div>{" "}
                </section>
              </div>
            </div>
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default RecentPosts;
