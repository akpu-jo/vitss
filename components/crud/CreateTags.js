import React, { useState, useReducer, useEffect, Fragment } from "react";
import { createTag, getTags } from "../../services/tag";
import { XCircleIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";

export default function CreateTags({ postTags, setPostTags }) {

  const [tags, setTags] = useState([]);
  const [name, setName] = useState(""); //tagname from input box
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [values, setValues] = useState({
    error: false,
    success: false,
    reload: false,
  });

  const { error, success, reload } = values;

  useEffect(() => {
    initTags();
  }, [reload]);

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  //Name is the text written on the input field
  const searchTags = (name) => {
    let matches = [];

    if (name.length > 0) {
      matches = tags.filter((tag) => {
        const regex = new RegExp(`${name}`, "gi");
        return tag.name.match(regex);
      });
    }

    setFilteredTags(matches);
    setName(name);
  };

  const handleSelected = (t) => () => {
    console.log(t);
    const tag = [t];
    const clickTag = selectedTags.indexOf(t);
    const all = [...postTags];
    const allSelect = [...selectedTags];

    if (clickTag === -1) {
      all.push(tag[0]._id);
      allSelect.push(tag);

      setSelectedTags((selectedTags) => [...selectedTags, ...tag]);
      setPostTags(all);
    }

    console.log(JSON.stringify(all));
  };

  const createTags = (e) => {
    e.preventDefault();
    createTag({ name }, token).then((data) => {
      console.log(name);
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setTags((tags) => [...tags, ...[data]]);
        setValues({
          ...values,
          error: false,
          success: true,
          reload: !reload,
        });
      }
    });
  };

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="bg-transparent w-36 text-gray-500 border-2 border-purple-200 hover:bg-purple-50 text-base text-center font-semibold tracking-widest px-2 py-2 rounded-lg hover:shadow focus:outline-none">
          <span>Add Tags</span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 w-screen max-w-xs px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative bg-white p-3 text-gray-400 text-lg">
                <small className="">
                  Add or change tags (at least 1, and up to 5) so readers know
                  what your story is about: <br></br>
                </small>
                {selectedTags &&
                  selectedTags.map((tag, i) => (
                    <button
                      key={i}
                      className=" mr-2 mb-2 p-2 rounded-sm bg-gray-200 hover:bg-gray-300"
                    >
                      <div className=" flex items-center justify-between">
                        {tag.name}
                        <XCircleIcon
                          onClick={() => {
                            const tagIndex = postTags.indexOf(tag._id);
                            const all = [...postTags];
                            all.splice(tagIndex, 1);
                            setPostTags(all);

                            const tagSelected = [...selectedTags];
                            tagSelected.splice(selectedTags.indexOf(tag), 1);
                            setSelectedTags(tagSelected);
                          }}
                          className="h-5 w-5 pl-2 text-gray-600"
                        />
                      </div>
                    </button>
                  ))}
                {selectedTags.length < 5 && (
                  <input
                    type="text"
                    autoFocus
                    required
                    className=" font-light text-gray-500 text-left  py-3 px-2 focus:outline-none"
                    placeholder="Add a tag..."
                    value={name}
                    onChange={(e) => searchTags(e.target.value)}
                  />
                )}
                {filteredTags &&
                  selectedTags.length < 5 &&
                  filteredTags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={handleSelected(tag)}
                      className=" flex flex-col pb-1 px-2 rounded-sm bg-gray-200 hover:bg-gray-300 mb-1"
                    >
                      {tag.name}
                    </button>
                  ))}
                {name.length > 1 && filteredTags.length === 0 && (
                  <button
                    className="bg-secondary-red2 bg-opacity-80 text-gray-50 active:bg-pink-400 hover:bg-pink-600 text-base font-bold px-4 py-2 ml-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none"
                    type="submit"
                    onClick={createTags}
                  >
                    Create Tag
                  </button>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
