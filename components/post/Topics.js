import React, { useEffect, useState } from "react";

import Link from "next/link";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";

import { getTags } from "../../services/tag";

const Topics = () => {
  const [tags, setTags] = useState([]);

  const getAllTags = async () => {
    const res = await getTags();
    setTags(res);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 12,
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
    <div className=" mx-10">
      <h2 className="flex capitalize tracking-wider text-gray-600 text-xl font-serif font-semibold py-4">
        {" "}
        Recommended Topics
      </h2>
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {tags.map((t, i) => (
          <Link key={i} href={`/tags/${t.slug}`}>
            <button
              key={i}
              className="bg-transparent text-gray-500 border-2 border-purple-200 hover:bg-purple-50 text-base font-semibold tracking-widest w-auto px-4 py-2 rounded-lg hover:shadow focus:outline-none"
            >
              {t.name}
            </button>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Topics;
