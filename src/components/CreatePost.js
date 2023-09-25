import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/addNewPost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchUserById } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../features/addNewPost";

function CreatePost() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      console.log(user.username);
    }
  }, [user]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);
    formData.append("username", user.username);

    dispatch(addNewPost(formData)).then(() => {
      dispatch(fetchPosts());
      navigate("/dashboard");
    });
  };

  console.log(content);
  useEffect(() => {
    dispatch(fetchUserById());
  }, [dispatch]);

  const editorModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form className="w-3/4" onSubmit={handleSubmit}>
          {" "}
          {/* <-- Updated width here */}
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
          <div className="w-full mb-2 p-2 border">
            <ReactQuill
              value={content}
              onChange={setContent}
              style={{ height: "300px" }}
              modules={editorModules}
              theme={"snow"}
            />
          </div>
          <button
            type="submit"
            style={{ marginTop: "5px" }}
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
