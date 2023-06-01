import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/addNewPost";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('content', content);

    dispatch(addNewPost(formData));
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 border"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full mb-2 p-2 border"
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            className="w-full mb-2 p-2 border"
          />
          <button
            type="submit"
            style={{ marginTop: '5px' }}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
