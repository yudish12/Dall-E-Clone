import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import Showposts from "../components/Showposts";

const Postpage = () => {
  const { postState, postDispatch } = useGlobalContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await axios.get("http://localhost:5000/api/posts");
        resp.data.posts.reverse();
        postDispatch({ type: "FETCH_POSTS_SUCCESS", payload: resp.data.posts });
      } catch (error) {
        postDispatch({ type: "FETCH_POSTS_ERROR" });
      }
    };
    postDispatch({ type: "FETCH_POSTS_REQ" });
    fetchPosts();
  }, [postDispatch]);

  if (postState.loading) {
    return (
      <div className="flex justify-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
          classname="text-center mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start p-4 ">
      <Showposts />
    </div>
  );
};

export default Postpage;
