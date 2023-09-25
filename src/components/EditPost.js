import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../hooks/auth";
import { fetchPost, editPost } from "../features/addNewPost";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();

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
      ["video"],
      ["image"],
    ],
  };

  // grab the original post information from the server.
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  // grab the post from the redux state.
  const post = useSelector((state) => state.posts.post);

  // local state
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCurrentImage(post.image); // store the url of the current image
    }
  }, [post]);

  // update the image state and the current image url
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setCurrentImage(URL.createObjectURL(e.target.files[0])); // Update current image with the new file's URL.
  };

  // dispatch edit post
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // only append a new image if one was uploaded.
    if (image) {
      formData.append("image", image);
    }

    dispatch(editPost({ id: id, formData: formData }));
    alert("Post Updated!");
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
            modules={editorModules}
            className="w-full mb-2 p-2 border"
          />

          <button
            type="submit"
            style={{ marginTop: "5px" }}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
