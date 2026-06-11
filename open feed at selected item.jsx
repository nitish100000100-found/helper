profile.jsx 
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileGrid() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts");

      setPosts(res.data.posts);
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    sessionStorage.setItem("selectedPost", postId);

    navigate("/feed");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
      }}
    >
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => handlePostClick(post._id)}
          style={{
            height: "150px",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          {post.caption}
        </div>
      ))}
    </div>
  );
}

export default ProfileGrid;









feed .jsx



import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts");

      setPosts(res.data.posts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!posts.length) return;

    const selectedPostId =
      sessionStorage.getItem("selectedPost");

    if (!selectedPostId) return;

    const element =
      document.getElementById(selectedPostId);

    element?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }, [posts]);

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          id={post._id}
          style={{
            height: "100vh",
            borderBottom: "1px solid gray",
          }}
        >
          <h1>{post.caption}</h1>
        </div>
      ))}
    </div>
  );
}

export default Feed;
