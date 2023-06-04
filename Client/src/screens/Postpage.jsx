import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import Showposts from "../components/Showposts";

const Postpage = () => {
  const { postState, postDispatch } = useGlobalContext();
  const [arr, setArr] = useState(postState.posts);

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

  const handleChange = (e) => {
    postDispatch({ type: "SEARCH_POSTS_REQ", payload: e.target.value });
    console.log(postState);
    setArr(postState.posts.filter((el) => el.prompt.includes(e.target.value)));
    postDispatch({ type: "SEARCH_POSTS_SUCCESS" });
    console.log(postState);
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 mt-8">
      <input
        type="text"
        className="w-[32rem] border-2 border-black px-4 py-2 rounded-md "
        placeholder="Search Posts ...."
        onChange={handleChange}
      />
      {postState.loading ? (
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
      ) : (
        <div className="flex flex-col items-center justify-start p-4 mt-4">
          <Showposts arr={arr} />
        </div>
      )}
    </div>
  );
};

export default Postpage;
