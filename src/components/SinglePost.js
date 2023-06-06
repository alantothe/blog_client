import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost } from '../features/addNewPost';
import { useAuth } from '../hooks/auth';
import { deletePost } from '../features/addNewPost';

const SinglePost = () => {
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.post);
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(fetchPost(id));
    }, [dispatch, id]);

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    }

    const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      if (confirmDelete) {
        dispatch(deletePost(id));
        navigate('/dashboard')
      }
    };

    return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">{post.title}</h1>
      <p className="text-center text-gray-500">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div
        style={{ backgroundImage: `url("http://localhost:4000/uploads/${post.image}")` }}
        className="bg-no-repeat bg-center bg-cover w-full h-64"
      />
      <p className="text-center" dangerouslySetInnerHTML={{ __html: post.content }}></p>


      <p className="text-center">Posted by: {post.username}</p>
      {user && user.username === post.username &&
        <div>
          <button className="bg-gray-300 mr-2" onClick={handleEdit}> Edit Post </button>
          <button className="bg-gray-300" onClick={handleDelete}> Delete Post </button>
        </div>
      }
    </div>
    );
  }

export default SinglePost;

