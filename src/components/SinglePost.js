import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, deletePost } from "../features/addNewPost";
import { useAuth } from "../hooks/auth";

const SinglePost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      dispatch(deletePost(id));
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-8 px-6">
      <h1 className="text-4xl pt-20 font-bold text-center">{post.title}</h1>
      <p className="text-center text-gray-500 text-lg"></p>
      <div
        style={{ backgroundImage: `url(${post.image})` }}
        className="bg-no-repeat bg-center bg-cover w-full h-96"
      />
      <div>
        <p
          className="text-center text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></p>
      </div>

      <p className="text-center text-lg">
        Posted by: {post.username} on {"  "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {user && user.username === post.username && (
        <div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleEdit}
          >
            {" "}
            Edit Post{" "}
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            {" "}
            Delete Post{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
