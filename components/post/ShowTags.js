import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "../../services/auth";
import { getTags } from "../../services/tag";

function ShowTags() {
  const token = getCookie("token");
  const [tags, setTags] = useState([]);

  const getAllTags = async () => {
    const res = await getTags(token);
    setTags(res);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <div className="col-span-3">
      <section className=" sticky top-3">
        <p className=" text-xl font-serif p-2 ">Popular Topics</p>
        {tags.map((t, i) => (
          <Link key={i} href={`/tags/${t.slug}`}>
            <button
              key={i}
              className="mr-1 ml-1 mt-3 bg-transparent text-gray-500 border-2 border-purple-200 hover:bg-purple-50 text-lg font-bold tracking-widest px-4 py-2 rounded-lg hover:shadow focus:outline-none"
            >
              {t.name}
            </button>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default ShowTags;
