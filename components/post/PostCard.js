import React from "react";
import Link from "next/link";
import Image from "next/image";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

import {
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

function PostCard({ post }) {
  const postTags = (post) =>
    post.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="pb-1 px-2 rounded-sm bg-gray-200 hover:bg-gray-300 mr-1">
          {t.name}
        </a>
      </Link>
    ));

  return (
    <div className="pb-2 rounded-xl">
      <figure class="md:grid grid-cols-9 bg-gray-100 rounded-xl p-8 md:p-0">
        <div className="relative col-span-3 m-2">
          <Image
            className=" object-cover rounded-xl"
            src={`${API}/posts/photo/${post.slug}`}
            alt=""
            layout="fill"
          />
        </div>

        <div className=" col-span-6 pt-3 md:p-4 text-center md:text-left space-y-2">
          <header className=" flex justify-between items-center">
            <Link href={`/p/${post.slug}`}>
              <a>
                <h2 className="pt-2 pb-2 text-2xl text-gray-600 font-bold">
                  {post.title}
                </h2>
              </a>
            </Link>
            <div className="text-gray-400">
              {moment(post.updatedAt).fromNow()}
            </div>
          </header>
          <div className="text-gray-600 font-base">
            {renderHTML(post.excerpt)}
          </div>
          <div className="font-medium flex justify-between items-center">
            <div className=" text-gray-500 text-base text-center font-extralight">
              <section>{postTags(post)}</section>
            </div>
            <Link href={`/p/${post.slug}`}>
              <a>
                <ArrowNarrowRightIcon className="h-8 w-8 text-purple-300 opacity-90" />{" "}
              </a>
            </Link>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default PostCard;
