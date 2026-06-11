import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `/posts?page=${page}`
      );

      setPosts((prev) => [
        ...prev,
        ...res.data,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight +
          window.scrollY >=
        document.documentElement.scrollHeight -
          100;
      // window.innerHeight  -> Visible screen height
// window.scrollY      -> Distance scrolled from top
// scrollHeight        -> Total page content height

      if (bottom && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [loading]);

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            padding: "20px",
            border: "1px solid gray",
            marginBottom: "10px",
          }}
        >
          {post.caption}
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Feed;
