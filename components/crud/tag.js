import { useState, useEffect } from "react";
import {
  createTag,
  getTags,
  removeTag,
} from "../../actions/tag";
import { isAuth, getCookie } from "../../actions/auth";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");
  const isInvalid = false;

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags(token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.message);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((t, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(t.slug)}
          title="Double click to delete"
          key={i}
          className="mr-1 ml-1 mt-3 bg-transparent text-gray-500 border-2 border-purple-200 hover:bg-purple-50 text-lg font-bold tracking-widest px-4 py-2 rounded-lg hover:shadow focus:outline-none"
        >
          {t.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this tag?"
    );
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    // console.log('delete', slug);
    removeTag(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    // console.log('create category', name);
    createTag({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: false,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  const newTagForm = () => (
    <form onSubmit={clickSubmit} className="my-2.5">
      <input
        aria-label="Search for an article"
        type="text"
        placeholder="Tag name"
        onChange={handleChange}
        value={name}
        required
        className="p-2 w-1/3 rounded-lg text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-pink-100"
      />
      <button
        disabled={isInvalid}
        className={`bg-secondary-red2 bg-opacity-80 text-gray-50 active:bg-pink-400 hover:bg-pink-600 text-base font-bold px-4 py-2 ml-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ${
          isInvalid && "cursor-not-allowed opacity-50"
        }`}
        type="submit"
      >
        Create
      </button>

      <div className=" pt-3"></div>
    </form>
  );

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </>
  );
};

export default Tag;
