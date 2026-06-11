big block.jsx
import { useNavigate } from "react-router-dom";

export default function Grid() {
  const navigate = useNavigate();

  const posts = [
    { _id: "1", caption: "Post 1" },
    { _id: "2", caption: "Post 2" },
    { _id: "3", caption: "Post 3" },
    { _id: "4", caption: "Post 4" },
    { _id: "5", caption: "Post 5" },
  ];

  return (
    <>
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          {post.caption}
        </div>
      ))}
    </>
  );
}





onething.jsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = [
    { _id: "1", caption: "Post 1" },
    { _id: "2", caption: "Post 2" },
    { _id: "3", caption: "Post 3" },
    { _id: "4", caption: "Post 4" },
    { _id: "5", caption: "Post 5" },
  ];

  const currentIndex = posts.findIndex(
    (post) => post._id === postId
  );

  const currentPost = posts[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Left Arrow
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        navigate(`/post/${posts[currentIndex - 1]._id}`);
      }

      // Right Arrow
      if (
        e.key === "ArrowRight" &&
        currentIndex < posts.length - 1
      ) {
        navigate(`/post/${posts[currentIndex + 1]._id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, navigate]);

  if (!currentPost) {
    return <h1>Post Not Found</h1>;
  }

  return (
    <div>
      <h1>{currentPost.caption}</h1>

      <button
        disabled={currentIndex === 0}
        onClick={() =>
          navigate(`/post/${posts[currentIndex - 1]._id}`)
        }
      >
        ← Previous
      </button>

      <button
        disabled={currentIndex === posts.length - 1}
        onClick={() =>
          navigate(`/post/${posts[currentIndex + 1]._id}`)
        }
      >
        Next →
      </button>
    </div>
  );
}




