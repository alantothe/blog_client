import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/addNewPost';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const navigate = useNavigate();
  // grabs all posts

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      {posts.map((post) => (
        <div className="flex-grow-1 flex justify-center items-center cursor-pointer" onClick={() => navigate(`/post/${post.id}`)}>
          <div className="max-w-6xl w-full">
            <div className="post flex items-start gap-4 mx-auto mb-4 max-w-full py-4">
              <div
                style={{ backgroundImage: `url("http://localhost:4000/uploads/${post.image}")` }}
                className="bg-no-repeat bg-center bg-cover w-1/2 h-64"
              />

              <div className="post-info flex flex-col w-1/2">
                <h2 className="post-title text-2xl font-extrabold mt-0 mb-4">{post.title}</h2>
                <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                <div className="post-content overflow-hidden max-h-20">{post.content}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;


