import { DocumentSearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { listSearch } from "../../services/post";
import Header from "../../components/Header";
import PostCard from "../../components/post/PostCard";
import SearchPosts from "../../components/post/SearchPosts";
import ShowTags from "../../components/post/ShowTags";

function Search() {

  const router = useRouter();
  const { search } = router.query;
  const [searchResult, setSearchResult] = useState([]);

  const getSearchResult = async () => {
    const posts = await listSearch({ search });
    setSearchResult(posts.result);
  };

  useEffect(() => {
    getSearchResult();
  }, [search]);

  return (
    <>
      <Header>
        <SearchPosts search={search}/>
      </Header>
      <div className=" max-w-7xl mx-auto">
        <header className="flex capitalize tracking-wider text-gray-600 text-3xl font-semibold py-4">
          {" "}
          <DocumentSearchIcon className="h-8 w-8 text-gray-400 opacity-90" />{" "}
          {search}
        </header>
        <div className="grid grid-cols-9 gap-16">
          <section className=" col-span-6">
            {searchResult.length === 0 && (
              <div className="m-10">
                <h2 className="p-2 text-xl text-gray-800 font-bold text-center">No results found</h2>
                <p className=" text-base text-gray-500 text-center">It seems we can’t find any results based on your search.</p>
              </div>
            )}

            {searchResult.map((post, i) => (
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

export default Search;
