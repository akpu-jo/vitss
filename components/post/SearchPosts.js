import React, { useState } from "react";
import renderHTML from "react-render-html";
import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function SearchPosts({search}) {

  const router = useRouter();
  const [query, setQuery] = useState(search)


  const searchSubmit = async (e) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <form
      onSubmit={searchSubmit}
      className="relative text-lg bg-transparent text-gray-800"
    >
      <div className="flex items-center border-b-2 border-teal-500 hover:border-primary-brick py-2">
        <input
          className="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search"
          ariaLabel="Search for an article"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <SearchIcon className="h-5 w-5 hover:text-primary-brick text-gray-400 opacity-90" />
        </button>
      </div>
    </form>
  );
}

export default SearchPosts;
